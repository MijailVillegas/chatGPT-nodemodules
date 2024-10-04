export const handler = async (event) => {
  const response= { event: ""}
  try {
    switch (event.body.event) {
      case "train": /* Paso 1, 2 o 3 */
        response.event = "train";
        console.log("event training");
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
        response.event = "check_cripto";
        console.log("event check cripto");
        break;
      default:
          const error = new Error("Invalid event");
          error.statusCode = 400; // Agrega propiedades adicionales si es necesario
          throw error;
    } 
  } catch (error) {
    const status = error.statusCode || 500;
    console.log("status: ", error.statusCode);
    console.log("message:", error.message);
    return {
      statusCode: status,
      body: JSON.stringify({ error: error.message }),
    };
  }
};