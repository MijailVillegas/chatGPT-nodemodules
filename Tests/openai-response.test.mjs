// Medir el tiempo de creación de la instancia
console.time("Creation Time");
const response = openaiResponse.new(response_example);
/* const response = new openaiResponse;
response.id = response_example.id;
response.object = response_example.object;
response.created = response_example.created;
response.model = response_example.model;
response.choices = response_example.choices;
response.usage = response_example.usage;
response.system_fingerprint = response_example.system_fingerprint; */
console.timeEnd("Creation Time");

// Medir el tiempo de ejecución de `toString()`
console.time("ToString Time");
console.log(response.toString());
console.timeEnd("ToString Time");

// Medir el tiempo de ejecución de `destroy()`
console.time("Destroy Time");
response.destroy();
console.timeEnd("Destroy Time");
