import axios from 'axios';
import { jsonFilter } from './Libraries/Cleaners/jsonExtract.mjs';

export const handler = async (event) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: `${event.prompt}` }],
        temperature: 0.9,
        max_tokens: 8100,
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return {
      statusCode: 200,
      body: jsonFilter(response.data.choices[0].message.content),
    };
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    console.log("error from API", error);
    return {
      statusCode: status,
      body: JSON.stringify({ error: error.message }),
    };
  }
};