### Application
Cognito SSO (Single-Sign-On) Demo stack.  
The solution consists of 3 parts:  
(1) AWS Cognito User Pool with hosted UI and Client Secret  
(2) Backend API for authentication/authorization and common CRUD tasks - multiple implementation (NestJs, Flask)  
(3) Frontend APP - multiple implementation (React)

**Authentication/Authorization mechanish**  
1) when the unauthenticated user (without tokens) enters the site he/she will see a welcome page with a login button which redirects him/her to the Cognito Hosted UI
2) the user signs in or signs up on the Hosted UI, then is redirected to the Application UI with a Cognito Authentication Code in the URL (eg. `http://localhost:3000/signin?code=1234xyz`)
3) the UI will send the Authentication Code for the API and exchange it for an Access Token and a Refresh Token
4) the user/UI can then make a normal API request (eg. `GET /stats`)
5) the Access Token and the Refresh token will be sent in the request headers section
5) the API will validate the Access Token for every request
6) in case the Access Token is expired, the backend will ask for a new Access Token from Cognito service using the user's Refresh Token
7) the API returns the response (including the newly created Access Token)
8) the UI App saves the new Access Token

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

### Launch locally / on your own
1) create a Cognito User Pool with hosted UI and Client Secret.
2) Setup Cognito Client sign-in and sign-out callback endpoints for `http://localhost:3000/signin` and `http://localhost:3000/signout`
3) Collect Cognito properties: `Pool ID`, `Client ID`, `Client Secret`, `Hosted UI Domain`, `Region`
4) Launch (any) backend API locally on port 8000 (default). Set environment variables (`.env` or `.envrc` file) according to Cognito properties
5) Launch (any) frontend UI locally on port 3000 (default). Set environment variables (`.env` file) and server URL (eg. `http://localhost:8000`)
