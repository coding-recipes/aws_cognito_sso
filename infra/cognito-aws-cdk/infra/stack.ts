import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cg from 'aws-cdk-lib/aws-cognito';
import * as lambda from 'aws-cdk-lib/aws-lambda';

interface WithAwsCdkStackProps extends cdk.StackProps {
  appUrls: string[];
  signInRoute: string;
  signOutRoute: string;
  cognitoDomainPrefix: string;
  userPoolName: string;
  lambdaName: string;
}

export class WithAwsCdkStack extends cdk.Stack {
  private userPool: cg.UserPool;
  private userPoolClient: cg.UserPoolClient;
  private userPoolDomain: cg.UserPoolDomain;
  private props: WithAwsCdkStackProps;

  constructor(scope: Construct, id: string, props: WithAwsCdkStackProps) {
    super(scope, id, props);
    this.props = props;

    this.createCognitoUserPool();
    this.createCognitoUserPoolClient();
    this.createCognitoUserPoolDomain();
    this.createAutoConfirmUserLambda();

    new cdk.CfnOutput(this, 'PoolId', { value: this.userPool.userPoolId });
    new cdk.CfnOutput(this, 'ClientId', { value: this.userPoolClient.userPoolClientId });
    new cdk.CfnOutput(this, 'ClientDomain', { value: this.userPoolDomain.domainName });
    new cdk.CfnOutput(this, 'ClientRegion', { value: this.region });
    new cdk.CfnOutput(this, 'ClientSecret', { value: '---- see cognitor console ----' });
  }

  private createCognitoUserPool() {
    const userPoolProps: cg.UserPoolProps = {
      userPoolName: this.props.userPoolName,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      selfSignUpEnabled: true,
      signInAliases: {
        username: true
      },
      autoVerify: {
        email: false,
        phone: false
      },
      passwordPolicy: {
        minLength: 6,
        requireDigits: false,
        requireLowercase: false,
        requireSymbols: false,
        requireUppercase: false
      },
      accountRecovery: cg.AccountRecovery.NONE,
    }
    this.userPool = new cg.UserPool(this, 'UserPool', userPoolProps);
  }

  private createCognitoUserPoolClient() {
    const userPoolClientProps: cg.UserPoolClientProps = {
      userPool: this.userPool,
      generateSecret: true,
      authFlows: {
        userPassword: true,
        userSrp: true,
        // adminUserPassword: true,
      },
      refreshTokenValidity: cdk.Duration.days(1),
      accessTokenValidity: cdk.Duration.minutes(5),
      idTokenValidity: cdk.Duration.minutes(30),
      authSessionValidity: cdk.Duration.minutes(5),
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
          // implicitCodeGrant: true,
        },
        scopes: [
          cg.OAuthScope.PHONE,
          cg.OAuthScope.EMAIL,
          cg.OAuthScope.OPENID,
          // cg.OAuthScope.PROFILE,
          // cg.OAuthScope.COGNITO_ADMIN
        ],
        callbackUrls: this.props.appUrls.map(url => `${url}/${this.props.signInRoute}`),
        logoutUrls: this.props.appUrls.map(url => `${url}/${this.props.signOutRoute}`),
      },
      supportedIdentityProviders: [
        cg.UserPoolClientIdentityProvider.COGNITO
      ]
    }

    this.userPoolClient = new cg.UserPoolClient(this, 'UserPoolClient', userPoolClientProps);
  }

  private createCognitoUserPoolDomain() {
    const userPoolDomainProps: cg.UserPoolDomainProps = {
      userPool: this.userPool,
      cognitoDomain: {
        domainPrefix: this.props.cognitoDomainPrefix
      }
    }
    this.userPoolDomain = new cg.UserPoolDomain(this, 'UserPoolDomainCnstr', userPoolDomainProps);
  }

  private createAutoConfirmUserLambda() {
    const autoconfirmUserLambda = new lambda.Function(this, 'AutoconfirmUserLambda', {
      functionName: this.props.lambdaName,
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'user_autoconfirm.handler',
      environment: {}
    });
    this.userPool.addTrigger(cg.UserPoolOperation.PRE_SIGN_UP, autoconfirmUserLambda);
  }

}
