
docker tag cognito-sso-be1-nestjs:latest public.ecr.aws/r6t9s9b3/cognito-sso-be1-nestjs:latest

aws ecr-public get-login-password --region us-east-1 --profile demo | docker login --username AWS --password-stdin public.ecr.aws/r6t9s9b3

docker push public.ecr.aws/r6t9s9b3/cognito-sso-be1-nestjs:latest