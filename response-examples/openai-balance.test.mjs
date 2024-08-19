import axios from "axios";

const apiKey = process.env.OPENAI_API_KEY;


// NO EXISTE MANERA DE RECUPERAR EL BALANCE DE OPEN AI
async function balanceOpenai() {
    try{
        const response = await axios.get(
          `https://api.openai.com/v1/account/balance`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        console.log(response.data); // Imprime la respuesta de la API de OpenAI en la consola de Node.js con response.data;
    }
    catch(error){
        console.error(error);
        throw new Error('Error al obtener el saldo de OpenAI');
    }
}

balanceOpenai();