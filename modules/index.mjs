import { trainFileJSONL } from "../chat/functions.chat.mjs";
import { payloadDecrypt } from "./Libraries/cryptography/Host/cryptoService.mjs";

export const handler = async (event) => {
  const response = {
    status: 200,
  }
  try {
    switch (event.event) {
      case "train": /* Paso 1, 2 o 3 */
        const trainResponse = trainFileJSONL(event);
        break;
      case "check_train": /* Paso 3 */
        response.event = "check_train";
        console.log("event check training");
        break;
      case "thread":  /* Paso 5 */
        response.event = "thread";
        console.log("event thread");
        break;
      case "messaging": /* Paso 6, 7, 8 o 9*/
        response.event = "messaging";
        console.log("event prompt");
        break;
      case "check_cripto":
        Object.assign(response, payloadDecrypt(event.body.payload));
        if (!response.valid){
          console.log(response.body);
          const error = new Error("unauthorized");
          error.statusCode = 401;
          throw error;
        }
        response.message = "authorized";
        break;
      default:
          const error = new Error("Invalid event");
          error.statusCode = 400; // Agrega propiedades adicionales si es necesario
          throw error;
    } 
    return response;
  } catch (error) {
    const status = error.statusCode || 500;
    return {
      status: status,
      message: error.message,
    };
  }
};