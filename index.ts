import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayEvent, Context, Handler } from 'aws-lambda';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);

    const command = new ScanCommand({
        ProjectionExpression: '#N, #F',
        ExpressionAttributeNames: { '#N': 'movie_name', '#F': 'movie_fact' },
        TableName: 'movie_facts',
    });

    try {
        const response = await docClient.send(command);
        if (response.Items) {
            return {
                statusCode: 200,
                body: JSON.stringify(response.Items),
            };
        }

        return {
            statusCode: 200,
            body: 'empty dataset',
        };
    } catch (error) {
        console.log(`operation failed\nerror:${error}`);
        return { statusCode: 500, body: 'failed to return facts' };
    }
};
