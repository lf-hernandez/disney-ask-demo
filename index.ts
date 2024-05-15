import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

// source: https://pizzabottle.com/85902-disney-facts-blow-mind/
const movieFacts = [
	"The vultures in The Jungle Book were supposed to be voiced by The Beatles; however, due to a scheduling conflict they couldn’t make it to the studio so they had other actors instead. Hence why they look like The Beatles in the film.",
	"101 Dalmatians, Peter Pan, Lady and the Tramp, and Mulan are the only animated Disney films where both parents are present and don’t die during the movie.",
	"Bambi only uses 72 words throughout the entire film."
];

export const handler: Handler = async (event: APIGatewayEvent, context: Context) => {
	console.log(`Event: ${JSON.stringify(event, null, 2)}`);
	console.log(`Context: ${JSON.stringify(context, null, 2)}`);

	const randomIndex = Math.floor(Math.random() * movieFacts.length);
	const randomFact = movieFacts[randomIndex];

	return {
		statusCode: 200,
		body: JSON.stringify({ trivia: randomFact }),
	}
}
