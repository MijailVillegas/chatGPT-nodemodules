import { isAuthenticated } from "../../chat/functions.chat.mjs";

/**
 * Handler del evento "check_credentials". Verifica si el payload es válido
 * y ha sido desencriptado correctamente.
 * @param {Object} params - Un objeto con dos propiedades:
 *   - {Object} payload - Un objeto con dos propiedades:
 *     - {String} token - Un token de autenticación.
 *     - {String} signature - La firma digital del token.
 * @returns {Promise<Object>} - Un objeto con los siguientes campos:
 *   - {Number} status - El estado de la respuesta.
 *   - {String} event - El nombre del evento.
 *   - {Boolean} auth - True si el payload es válido, false de lo contrario.
 * @throws {Error} Si el payload no es válido o no se puede desencriptar.
 */
export const handleCredendials = (params) => {
  try {
    const auth = isAuthenticated(params.payload);
    if (!auth) {
      const error = new Error("unauthorized");
      error.statusCode = 401;
      throw error;
    }
    return { auth: auth };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};

