// https://github.com/awslabs/aws-support-tools/blob/master/Cognito/decode-verify-jwt/decode-verify-jwt.ts

import { promisify } from 'util';
import * as Axios from 'axios';
import * as jsonwebtoken from 'jsonwebtoken';
import * as jwkToPem from 'jwk-to-pem';
import { config } from '@/config'


export interface VerifyAccessTokenResult {
  readonly sub: string;
  readonly userName: string;
  readonly clientId: string;
  readonly isValid: boolean;
  readonly error?: any;
}

interface TokenHeader {
  kid: string;
  alg: string;
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  sub: string;
  iss: string;
  version: number;
  client_id: string;
  origin_jti: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

const cognitoIssuer = () => {
  const { poolId, clientRegion } = config().cognito
  return `https://cognito-idp.${clientRegion}.amazonaws.com/${poolId}`;
}


let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer()}/.well-known/jwks.json`;
    console.log('...COGNITO --> getPublicKeys')
    const publicKeys = await Axios.default.get<PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = { instance: current, pem };
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));


export const verifyAccessToken = async (token: string): Promise<VerifyAccessTokenResult> => {
  let result: VerifyAccessTokenResult
  try {
    console.log(`...checking ${token.substring(0, 8)}...`);
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as TokenHeader;
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
    const claim = await verifyPromised(token, key.pem) as Claim;
    const currentSeconds = Math.floor((new Date()).valueOf() / 1000);
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('claim is expired or invalid');
    }
    if (claim.iss !== cognitoIssuer()) {
      throw new Error('claim issuer is invalid');
    }
    if (claim.token_use !== 'access') {
      throw new Error('claim use is not access');
    }
    console.log(`...confirmed - ${claim.username} - ${claim.sub}`);
    result = { userName: claim.username, sub: claim.sub, clientId: claim.client_id, isValid: true };
  } catch (error) {
    result = { userName: '', sub: '', clientId: '', error, isValid: false };
  }
  return result;
};
