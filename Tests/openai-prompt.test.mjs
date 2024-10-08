import axios from "axios";

import { prompt2_PEI_optimized } from "../prompts/prompt-openai-PEI.optimize.mjs";
import { jsonFilter } from "../modules/Libraries/Cleaners/jsonExtract.mjs";

const startTime = performance.now();

var options = {
  method: "POST",
  url: "https://api.openai.com/v1/chat/completions",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
  data: {
    model: "gpt-4o-mini", // Modelo de lenguaje a utilizar
    messages: [{ role: "system", content: `${prompt2_PEI_optimized.prompt}` }], // Mensaje de sistema para indicar el propósito del chat
    temperature: 0.9, // Parámetro de temperatura entre 0 y 2, de determinista a creativo
    max_tokens: 2500, // Número máximo de tokens a generar
  },
};

axios
  .request(options)
  .then(function (response) {
    const endTime = performance.now();
    const timeSpend = endTime - startTime;
    console.log(`Time to complete: ${timeSpend}ms`);
    console.log(jsonFilter(response.data.choices[0].message.content));
  })
  .catch(function (error) {
    console.error(error);
  });

