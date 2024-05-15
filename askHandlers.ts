import { ErrorHandler, HandlerInput, RequestHandler } from 'ask-sdk-core';
import { Response, SessionEndedRequest } from 'ask-sdk-model';
import { fetchAllMovieFacts } from './etl';

export const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Welcome to your hey Disney demo skill. Ask me for a Disney movie fact!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(
                'Welcome to your hey Disney demo skill. Ask me for a Disney movie fact!',
                speechText
            )
            .getResponse();
    },
};

export const AskDisneyMovieFactsIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' && request.intent.name === 'AskDisneyMovieFactIntent'
        );
    },
    async handle(handlerInput: HandlerInput): Promise<Response> {
        try {
            const response = await fetchAllMovieFacts();
            if (response?.Items && response.Items.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.Items.length);
                const movieFact = response.Items[randomIndex];

                const speechText = `Did you know: ${movieFact.movie_fact}`;

                return handlerInput.responseBuilder
                    .speak(speechText)
                    .withSimpleCard('Did you know', speechText)
                    .getResponse();
            }

            return handlerInput.responseBuilder
                .speak("Sorry, I couldn't find any Disney movie facts at the moment.")
                .getResponse();
        } catch (error) {
            console.error(`Error fetching movie facts: ${error}`);
            return handlerInput.responseBuilder
                .speak('Sorry, I encountered an error while fetching Disney movie facts.')
                .getResponse();
        }
    },
};

export const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'You can ask me for a Disney movie fact!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('You can ask me for a Disney movie fact!', speechText)
            .getResponse();
    },
};

export const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return (
            request.type === 'IntentRequest' &&
            (request.intent.name === 'AMAZON.CancelIntent' ||
                request.intent.name === 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput: HandlerInput): Response {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('Goodbye!', speechText)
            .withShouldEndSession(true)
            .getResponse();
    },
};

export const SessionEndedRequestHandler: RequestHandler = {
    canHandle(handlerInput: HandlerInput): boolean {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput: HandlerInput): Response {
        console.log(
            `Session ended with reason: ${
                (handlerInput.requestEnvelope.request as SessionEndedRequest).reason
            }`
        );

        return handlerInput.responseBuilder.getResponse();
    },
};

export const CustomErrorHandler: ErrorHandler = {
    canHandle(handlerInput: HandlerInput, error: Error): boolean {
        return true;
    },
    handle(handlerInput: HandlerInput, error: Error): Response {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak("Sorry, I don't understand your command. Please say it again.")
            .reprompt("Sorry, I don't understand your command. Please say it again.")
            .getResponse();
    },
};
