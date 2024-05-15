import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

import { movieFacts } from './data';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const initMovieFacts = async () => {
    console.log('initializing movie_facts table');
    const putRequests = movieFacts.map((mf, index) => ({
        PutRequest: {
            Item: {
                id: uuidv4(),
                movie_name: mf.movieName,
                movie_fact: mf.movieFact,
            },
        },
    }));

    const command = new BatchWriteCommand({
        RequestItems: {
            ['movie_facts']: putRequests,
        },
    });

    try {
        console.log('sending batch write request');
        await docClient.send(command);
        console.log('operation succeeded');
    } catch (error) {
        console.log(`operation failed\nerror:${error}`);
    }
};

initMovieFacts();
