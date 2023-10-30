### Application
Cognito SSO (Single-Sign-On) Demo stack.  
The solution consists of 3 parts:  
(1) AWS Cognito User Pool with hosted UI and Client Secret  
(2) Backend API for authentication/authorization and common CRUD tasks - multiple implementation (NestJs, Flask)  
(3) Frontend APP - multiple implementation (React)

### Application Code / Repo Folders
`/be-1-nestjs`: backend NodeJs / NestJs implementation  
`/be-2-flask`: backend NodeJs / NestJs implementation  
`/ui-1-react`: frontend React implementation  
`/infra`: infrasturcture code (Cognito, CDN, API-s in Lambda) - in separate private repo  

### Infrastructure Code
the `/infra` folder is another linked repository, which contains the infrastructure code of the following elements:  
- Cognito User Pool  
- NestJs API (backend 1) hosted in AWS Lambda  
- Flask API (backend 2) hosted in AWS Lambda  
- Multisite CloudFront-S3 distribution for frontend applications    

private repository location: [Infrastructure Code](https://github.com/coding-recipes/infra_aws_cognito_sso)  

### Launch locally
1) create a Cognito User Pool with hosted UI and Client Secret
2) Setup Cognito Client sign-in and sign-out callback endpoints for `http://localhost:3000/signin` and `http://localhost:3000/signout`
3) Collect Cognito properties: `Pool ID`, `Client ID`, `Client Secret`, `Hosted UI Domain`, `Region`
4) Launch (any) backend API locally on port 8000 (default). Set environment variables (`.env` or `.envrc` file) according to Cognito properties
5) Launch (any) frontend UI locally on port 3000 (default). Set environment variables (`.env` file) and server URL (eg. `http://localhost:8000`)


### Authentication/Authorization mechanish  
1) the (unauthenticated = w/o tokens) user visits Application website
2) the user is redirected to the Cognito Hosted UI in order to sign in (or sign up)
3) the user is redirected back to the Application UI with a Cognito Authorization Code in the URL (eg. `http://localhost:3000/signin?code=1234xyz`)
4) the UI exchanges the Authorization Code with the API for an Access Token and a Refresh Token 
   - the UI sends the Code for the Server (API)
   - the Server exchanges the Authorization Code with Cognito API for the tokens
   - the API returns the tokes for the UI
5) the user/UI makes normal API requests (eg. `GET /stats`) with the Access Tokens and the Refresh Token sent in the request headers
6) the Server validates the Access Token JWT with the appropriate Cognito Public Key (JWK)
7) in case the Access Token is expired, the Server asks for a new Access Token from Cognito service using the Refresh Token
8) the API returns the response (including the newly created Access Token)
8) the UI App saves the new Access Token

![Cognito SSO](/docs/Cognito_SSO.png "Cognito SSO")