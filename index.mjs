import { Configuration, OpenAI } from 'openai';
import axios from 'axios';

export const handler = async(event) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAI(configuration);
    try{
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "Cuéntame un chiste": event.body}
            ],
            max_tokens: 150,
        });
        const chatgptReply = response.data.choices[0].message.content;
        return {
            statusCode: 200,
            body: JSON.stringify( {
                message: chatgptReply
            })
        };
    }catch(error){
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        };
    }
}