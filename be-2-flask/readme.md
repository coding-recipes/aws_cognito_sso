**Application**  
Backend Python / Flask implementation of Cognito SSO Demo.
The API is responsible for:
- token echanges, token validation and token refreshing  
- providing user data
- providing application data (eg. statistical sample data)


**Endpoints:**
- `/auth/get_tokens` - exchange Cognito Authorization Code for Access Token and Refresh Token
- `/user` - returns Cognito IDs of the authenticated user
- `/info/server` - Backend environment properties (language, framework, version, docs endpoint)
- `/stats` - Some demo statistical data

**Files**  
- `/app/main.py` Application entry point
- `/app/lambda.py` AWS lambda function handler

**Documentation**  
swagger (localhost): http://localhost:8000/openapi/

**Related links**  
[AWS Cognito authorization endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/authorization-endpoint.html)  
[AWS Cognito token endpoints](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html)  
[Verifying Cognito JWT](https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html)  
[Verifying Cognito JWT - sample](https://github.com/awslabs/aws-support-tools/tree/master/Cognito/decode-verify-jwt  )


**Commands**
- `make dev` launch server for development
- `make prod` launch server for production


**Env Variables for application**  
- `COGNITO_CLIENT_REGION`: AWS Cognito Region  
- `COGNITO_CLIENT_DOMAIN`: AWS Cognito hosted UI domain prefix  
- `COGNITO_CLIENT_ID`: AWS Cognito ClientId  
- `COGNITO_CLIENT_SECRET`: AWS Cognito Secret
- `COGNITO_POOL_ID`: AWS Cognito Pool Id
- `PORT`: (optional) server port number