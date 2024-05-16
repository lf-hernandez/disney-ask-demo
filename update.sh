#!/bin/bash

npm run build
if [ $? -eq 0 ]; then
    echo "build successful. Updating Lambda function..."
    
    aws lambda update-function-code --function-name ${FUNCTION_NAME} --zip-file fileb://dist/index.zip
    if [ $? -eq 0 ]; then
        echo "Lambda function updated successfully."
    else
        echo "error: Failed to update Lambda function."
        exit 1
    fi
else
    echo "error: Build failed."
    exit 1
fi
