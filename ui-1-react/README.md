## Cognito SSO Demo - React UI

### Application
... coming soon

### Demo Site
... coming soon

### Setup and Development 

**Commands**  
`yarn` or `yarn install`: install dependecies  
`yarn dev`: launch development  
`yarn deploy1`: build code and deploy it using `.env.be1`  
`yarn deploy2`: build code and deploy it using `.env.be2`  

**Env Variables for application**  
`VITE_COGNITO_REGION`: AWS Cognito Region  
`VITE_COGNITO_CLIENT_DOMAIN`: AWS Cognito hosted UI domain prefix  
`VITE_COGNITO_CLIENT_ID`: AWS Cognito ClientId  
`VITE_API_URL`: backend API URL

**Env Variables for deployment**  
`PROFILE`: AWS CLI profile  
`S3_BUCKET`: AWS S3 destination bucket  
`S3_FOLDER`: AWS S3 bucket destination folder  
`CLF_DIST`: AWS CloudFront distribution  

**Env Variable Files**  
`.env` or `.env.local` or `.env.development` can be used for development  
`.env.be1` settings for building and deploying with #No.1 backend.  
`.env.be2` settings for building and deploying with #No.2 backend.  

