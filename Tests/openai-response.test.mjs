import { openaiResponse } from "../modules/model/ResponseModel.mjs";
import { response_example } from "../response-examples/chat-openai-response.example.mjs";

// Medir el tiempo de creación de la instancia
let startTime = performance.now();
const response = openaiResponse.new(response_example);
/* const response = new openaiResponse;
response.id = response_example.id;
response.object = response_example.object;
response.created = response_example.created;
response.model = response_example.model;
response.choices = response_example.choices;
response.usage = response_example.usage;
response.system_fingerprint = response_example.system_fingerprint; */
let endTime = performance.now();
console.log(`Time to create object: ${ endTime - startTime}ms`);

// Medir el tiempo de ejecución de `toString()`

startTime = performance.now();
console.log(response.toJSONstring());
endTime = performance.now();
console.log(`Time to print object: ${ endTime - startTime}ms`);

// Medir el tiempo de ejecución de `destroy()`
startTime = performance.now();
response.destroy();
endTime = performance.now();
console.log(`Time to destroy object: ${ endTime - startTime}ms`);
