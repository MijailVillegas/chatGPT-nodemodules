import axios from "axios";

export async function CreateThread() {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/threads',
            '',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'OpenAI-Beta': 'assistants=v2',
                }
            }
        )
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

(async () => {
    try {
        const thread = await CreateThread();
        console.log("Thread creado:", thread);
    } catch (error) {
        console.error("Error creando Thread:", error);
    }
})();