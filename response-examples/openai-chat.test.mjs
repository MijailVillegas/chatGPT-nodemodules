import axios from "axios"; // Importamos el módulo de Axios para hacer solicitudes HTTP
/**
 * Esta función es un event listener asíncrono para una API.
 * Recibe un evento y devuelve una promesa que se resuelve con un objeto JSON.
 * El objeto JSON debe contener un campo "message" que es el chiste generado por la API de OpenAI.
 * En caso de ocurrir un error, se devuelve un objeto JSON con un campo "error" que contiene el mensaje de error.
 */
export default async function handler(event) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // URL de la API de OpenAI para completado de chat
      {
        model: "gpt-4o-mini", // Modelo de lenguaje a utilizar
        messages: [
          { role: "system", content: `${event.prompt}` },
        ], // Mensaje de sistema para indicar el propósito del chat
        temperature: 0.9, // Parámetro de temperatura entre 0 y 2, de determinista a creativo
        max_tokens: 100, // Número máximo de tokens a generar
      },
      {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido de la solicitud
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Autenticación utilizando el token de API
        },
      }
    );
    const chatgptReply = response.data.choices[0].message.content;
    return {
      statusCode: 200,
      body: JSON.stringify({ message: chatgptReply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}