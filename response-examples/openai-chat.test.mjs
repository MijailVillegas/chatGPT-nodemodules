import axios from "axios"; // Importamos el módulo de Axios para hacer solicitudes HTTP

const apiKey = process.env.OPENAI_API_KEY; // Obtener la clave de API de OpenAI desde las variables de entorno

/**
 * Esta función principal utiliza Axios para hacer una solicitud POST a la API de OpenAI 
 */
async function main() {
  let startTime = performance.now();
  let startMemory = process.memoryUsage().heapUsed;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // URL de la API de OpenAI para completado de chat
      {
        model: "gpt-4o-mini", // Modelo de lenguaje a utilizar
        messages: [
          { role: "system", content: "Cuéntame un chiste de informática" },
        ], // Mensaje de sistema para indicar el propósito del chat
        temperature: 0.9, // Parámetro de temperatura entre 0 y 2, de determinista a creativo
        max_tokens: 100, // Número máximo de tokens a generar
      },
      {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido de la solicitud
          Authorization: `Bearer ${apiKey}`, // Autenticación utilizando el token de API
        },
      }
    );
    console.log(`Tiempo de ejecución: ${performance.now() - startTime} ms`); // Imprimir el tiempo de ejecución del código
    console.log(`Memoria usada: ${(process.memoryUsage().heapUsed - startMemory) / 1024 / 1024} MB`); // Imprimir la memoria usada
    console.log(`Uso de memmoria por segundo: ${(process.memoryUsage().heapUsed - startMemory) / 1024 / 1024 / (performance.now() - startTime)} MB/s`); // Imprimir la memoria usada por segundo
    const completion = response.data; // Respuesta de la API
    console.log(completion); // Imprimir la respuesta completa
    const messageContent = completion.choices[0].message.content; // Contenido del primer mensaje de la respuesta
    console.log(messageContent); // Imprimir el contenido del primer mensaje
  } catch (error) {
    console.error("Error al llamar a la API de OpenAI:", error); // Imprimir un mensaje de error si ocurre alguna excepción
  }
}

main();

// Este código utiliza el módulo Axios para hacer solicitudes HTTP y generar un chiste de informática utilizando la API de OpenAI.