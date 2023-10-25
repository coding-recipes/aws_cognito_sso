#!/bin/bash

PROFILE=$1
if [ -z "${PROFILE}" ]; then
  PROFILE="demo"
fi

echo "----- PROFILE: $PROFILE"

# STAGE=$1 cdk deploy \-O exports.json
cdk deploy \-O exports.json \-\-profile $PROFILE