import gptInstance from "../Axios/axiosDefaultConf.mjs";

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