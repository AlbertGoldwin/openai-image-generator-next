import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPEN_AI_KEY,
});

export const openai = new OpenAIApi(configuration);
