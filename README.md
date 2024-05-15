# disney-ask-demo

This is a demo Alexa Skills Kit demo app powered by an AWS lambda and DynamoDB instance.

## Development setup

Install package dependencies:

```bash
npm i
```

Deploy:

```bash
npm run build
```

This transpiles the TypeScript files and bundles the package and it's dependencies into a single JavaScript file, the post-build cleanup step compresses the package into a zip file.

From here you can run the deploy script which essentially creates the Lambda with a configured runtime and execution role:

```bash
./deploy.sh
# contents
aws lambda create-function --function-name {FUNC_NAME} --runtime "nodejs20.x" --role {ARN} --zip-file "fileb://dist/index.zip" --handler index.handler
```

Update:

In order update the Lambda, simply run the update shell script:

```bash
./update.sh
# contents
aws lambda update-function-code --function-name {FUNC_NAME} --zip-file fileb://dist/index.zip
```

populating dynamodb
Ensure the dynamodb instance is setup on AWS and run:

```bash
$npx esbuild --platform=node --bundle --outdir=dist --tsconfig=tsconfig.json etl.ts

  dist/etl.js  1.5mb ⚠️

⚡ Done in 106ms
$node ./dist/etl.js
initializing movie_facts table
sending batch write request
operation succeeded
```
