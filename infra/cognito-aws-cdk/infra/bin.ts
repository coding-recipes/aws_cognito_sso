#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { WithAwsCdkStack } from './stack';

const app = new cdk.App();
new WithAwsCdkStack(app, 'WithAwsCdkStack', {
  stackName: 'sso-demo-cdk',
  userPoolName: 'sso-demo-cdk-pool',
  lambdaName: 'sso-demo-cdk-autoconfirm-user',
  cognitoDomainPrefix: 'c0gnit0-sso-demo',
  appUrls: [
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://cognito-sso-1.demo.petermaczo.com',
    'https://cognito-sso-2.demo.petermaczo.com',
    'https://cognito-sso-3.demo.petermaczo.com',
  ],
  signInRoute: 'signin',
  signOutRoute: 'signout',
});