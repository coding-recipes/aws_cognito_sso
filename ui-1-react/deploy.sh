if [ "$1" != "1" ] && [ "$1" != "2" ]; then
  echo "----- ERR: \$1 should be either '1' or '2' -----"
  exit 1
fi

ENV=be$1

source .env.$ENV

echo "----- S3 bucket: $S3_BUCKET"
echo "----- S3 folder: $S3_FOLDER"
echo "----- CLF_DIST: $CLF_DIST"
echo "----- PROFILE: $PROFILE"

rm -rf dist
yarn build --mode $ENV

cd dist

echo "----- Deploying to S3 bucket: $S3_BUCKET"
aws s3 sync . s3://$S3_BUCKET/$S3_FOLDER/ --profile $PROFILE

echo "----- Setting cache-control to 0"
aws s3 cp index.html s3://$S3_BUCKET/$S3_FOLDER/index.html --cache-control max-age=0 --profile $PROFILE

echo "----- Invalidating CloudFront cache"
aws cloudfront create-invalidation --distribution-id $CLF_DIST --paths /$S3_FOLDER/index.html --profile $PROFILE