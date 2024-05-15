import { Skill, SkillBuilders } from 'ask-sdk-core';
import { Handler } from 'aws-lambda';

import {
    AskDisneyMovieFactsIntentHandler,
    CancelAndStopIntentHandler,
    CustomErrorHandler,
    HelpIntentHandler,
    LaunchRequestHandler,
    SessionEndedRequestHandler,
} from './askHandlers';

let skill: Skill;

export const handler: Handler = async (event, context) => {
    console.log(`REQUEST++++${JSON.stringify(event)}`);
    if (!skill) {
        skill = SkillBuilders.custom()
            .addRequestHandlers(
                LaunchRequestHandler,
                AskDisneyMovieFactsIntentHandler,
                HelpIntentHandler,
                CancelAndStopIntentHandler,
                SessionEndedRequestHandler
            )
            .addErrorHandlers(CustomErrorHandler)
            .create();
    }

    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};
