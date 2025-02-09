import { Injectable } from '@nestjs/common';
import {AzureChatOpenAI} from "@langchain/openai";
import {ChatPromptTemplate} from "@langchain/core/prompts";

@Injectable()
export class RagService {

    model: AzureChatOpenAI
    constructor() {
        this.model = new AzureChatOpenAI({
            azureOpenAIApiKey: process.env.API_KEY,
            model: process.env.MODEL,
            azureOpenAIApiInstanceName: process.env.INSTANCE,
            azureOpenAIApiDeploymentName:
                process.env.DEPLOYMENT,
            azureOpenAIApiVersion: process.env.API_VERSION,
        });
    }

    async get(objective: string){
        const promptTemplate = ChatPromptTemplate.fromMessages([
            ['system', "Generate single keyResults object for user given objective. key result must contain only following properties: title (must be short and just only of max 2-3 word(s)), metrics (what metrics used in keyresult), and initial, completed and target must be number."],
            ['user', '{text} Give keyResults of give objective in the form of only json string. Important Note: Dont give me other explanation or anything, i just want json string only not in md format not in any other format only in json string text'],
        ]);

        const promptValue = await promptTemplate.invoke({
            text: objective,
        });

        const response = await this.model.invoke(promptValue);
        return JSON.parse(response.content as string);
    }
}
