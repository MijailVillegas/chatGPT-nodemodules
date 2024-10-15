import gptInstance from "../Axios/axiosDefaultConf.mjs";

/**
 * Esta funci n crea un nuevo hilo utilizando la API de OpenAI.
 *
 * @async
 * @function CreateThread
 * @returns {Promise<Object>} - Los datos de respuesta de la API de OpenAI.
 * @throws {Error} - Lanza un error si la solicitud falla.
 *
 */
export async function CreateThread() {
    try {
        const response = await gptInstance.post(
            'threads',
            '',
            {
                headers: {
                    'OpenAI-Beta': 'assistants=v2',
                }
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}


/* (async () => {
    try {
        const thread = await CreateThread();
        console.log("Thread creado:", thread);
    } catch (error) {
        console.error("Error creando Thread:", error);
    }
})(); */