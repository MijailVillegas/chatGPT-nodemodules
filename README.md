# API Gateway Lambda Handler

Este repositorio contiene la implementación de un handler para una Lambda Function que procesa distintos eventos recibidos a través de API Gateway. El handler distribuye las solicitudes a diferentes funciones en función del tipo de evento especificado en el cuerpo de la solicitud.

## Requisitos

- Node.js: versión 16 o superior.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

## Descripción General

El archivo principal es el `handler`, que sirve como punto de entrada para todas las solicitudes. La función `handler` se asegura de que las solicitudes pasen por una autenticación antes de redirigirlas a la función de manejo de eventos correspondiente, basada en el nombre del evento.

## Documentación de la API

Esta API maneja distintos eventos a través de un único punto de entrada, el cual distribuye las solicitudes a las funciones correspondientes dependiendo del evento recibido.

## Endpoints

### URL Base

POST <http://127.0.0.1:3080/lambda> (la url que pertenece a la lambda del proyecto)

### Formato de Solicitud

Todas las solicitudes deben tener el siguiente formato:

```json
{
  "payload": {
    "token": "abc123",
    "signature": "xyz456"
  },
  "body": {
    "event_name": "nombre_del_evento"
    // Otros parámetros específicos del evento
  }
}
```

### Módulos Importados

- **handleTrain**: Maneja los eventos relacionados con el entrenamiento de modelos (paso 1, 2 o 3).
- **handleCheckTrain**: Revisa el estado del entrenamiento de un modelo (paso 3).
- **handleNewThread**: Crea un nuevo hilo de mensajes (paso 5).
- **handleMessaging**: Gestiona la mensajería dentro de un hilo existente (paso 6, 7, 8 o 9).
- **handleBot**: Crea un nuevo bot.
- **handleBotRoutine**: Ejecuta una rutina programada para un bot.
- **handleCredentials**: Verifica las credenciales enviadas.
- **isAuthenticated**: Función que verifica si el `payload` enviado está autenticado correctamente.

### handleTrain

Entrena un archivo JSONL subido a la plataforma de GPT con un finetuning.

- `Parámetros`:
        - `data`: Un objeto con dos propiedades:
        - `payload`: Un objeto con dos propiedades:
            - `token` (String): Un token de autenticación.
            - `signature` (String): La firma digital del token.
        - `body`: El archivo JSONL con los datos de entrenamiento.

### Ejemplo de uso

```json
{
  "payload": {
  // Datos encriptados
  },
  "body": {
    "event": "train",
    "file": "training-data.jsonl"
  }
}
```

- `###` Retorna
  Un `Promise<Object>` con los siguientes campos:
- `file_id` (String): El ID del archivo subido.
- `job_id` (String): El ID del trabajo de finetuning.
- `status` (String): El estado del trabajo de finetuning.
- `estimated_finish` (Number): La fecha estimada de finalización del trabajo.

- `###` Errores
- Lanza un `Error` si:
  - El `payload` no es válido o no se puede desencriptar.
  - El archivo no se puede subir o no se puede crear el trabajo de finetuning.
  - El trabajo de finetuning no se puede crear o no se puede verificar su estado.
