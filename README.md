# API Gateway Lambda Handler

## Requisitos

- Node.js: versión 16 o superior.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

## Índice

1. [Introducción](#introducción)
2. [Descripción General](#descripción-general)
3. [Documentación de la API](#documentación-de-la-api)
4. [URL Base](#url-base)
   - [Endpoints](#endpoints)
5. [Formato de Solicitud](#formato-de-solicitud)
6. [Formato de Errores](#formato-de-errores)
7. [Módulos](#módulos)
   - [Train](#train)
   - [Checking Training](#checking-training)
   - [handleNewThread](#handlenewthread)
   - [handleMessaging](#handlemessaging)
   - [handleBot](#handlebot)
   - [handleBotRoutine](#handlebotroutine)
   - [handleCredentials](#handlecredentials)

## Introducción

Este repositorio contiene la implementación de un handler para una Lambda Function que procesa distintos eventos recibidos a través de API Gateway. El handler distribuye las solicitudes a diferentes funciones en función del tipo de evento especificado en el cuerpo de la solicitud.

## Descripción General

El archivo principal es el `handler`, que sirve como punto de entrada para todas las solicitudes. La función `handler` se asegura de que las solicitudes pasen por una autenticación antes de redirigirlas a la función de manejo de eventos correspondiente, basada en el nombre del evento.

## Documentación de la API

Esta API maneja distintos eventos a través de un único punto de entrada, el cual distribuye las solicitudes a las funciones correspondientes dependiendo del evento recibido.

## URL Base

POST <http://127.0.0.1:3080/lambda> (la url que pertenece a la lambda del proyecto)

### Endpoints

El endpoint es único debido a la naturaleza de ser usado en AWS
/Lambda

## Formato de Solicitud

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

- Dónde `payload` es el token y la firma proporcionada para autenticar al cliente.

- Dónde `body` es el cuerpo en el que se envía la solicitud con `event_name` como el identificador del evento que se desea ejecutar.

## Formato de Errores

Si no se cumple con el `body` se tentrá un error por defecto de `500`, `400` ó en su defecto si no se identifica correctamente con el payload `401`.

Por ejemplo

```json
{
  "status": 401,
  "message": "unauthorized"
}
```

(esto explicar en el handleCredentials)
El payload es proporcionado con un una firma de intercambio de llaves `.pem` para asegurar la autenticidad del cliente haciendo la petición.

Es un Middleware para asegurar una capa de protección extra contra el uso indebido de la API en la aplicación donde será implementada.

## Módulos

- **handleTrain**: Maneja los eventos relacionados con el entrenamiento de modelos.
- **handleCheckTrain**: Revisa el estado del entrenamiento de un modelo.
- **handleNewThread**: Crea un nuevo hilo para los mensajes.
- **handleMessaging**: Gestiona la mensajería dentro de un hilo existente.
- **handleBot**: Crea un nuevo bot.
- **handleBotRoutine**: Ejecuta una rutina programada para crear los 5 bots de Marketing, Finanzas, Recursos Humanos y Estrategia, el bot GADU deberá ser creado sólamente después de ciertas condiciones.
- **handleCredentials**: Verifica las credenciales enviadas.

### Train

Se hace la llamada a este evento con el nombre de `**train**` y hace uso del módulo `handleCheckTrain`.

Entrena un archivo JSONL subido a la plataforma de GPT con un finetuning, el archivo JSONL debe estar en formato texto.

> [!WARNING]  
> **NO ACEPTA BUFFER DE ARCHIVOS**

Por ejemplo:

```json
jsonl: [
{"messages": [{"role": "system", "content": "Chistero es un chatbot experto en contar chistes cortos y divertidos."}, {"role": "user", "content": "Cuéntame un chiste."}, {"role": "assistant", "content": "¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter."}]},
{"messages": [{"role": "system", "content": "Chistero es un chatbot experto en contar chistes cortos y divertidos."}, {"role": "user", "content": "Dime un chiste de animales."}, {"role": "assistant", "content": "¿Qué le dice un pez a otro pez? ¡Nada!"}]}
]
```

Se debe incluir al menos **10 ejemplos** para cada entrenamiento, cada ejemplo sería simplemente una línea del jsonl.

- **Ejemplo de uso**

```json
{
  "payload": {
    // Datos encriptados
  },
  "body": {
    "event": "train", //nombre del evento
    "jsonl": [] //aqui los ejemplos
  }
}
```

- **Retorna**

Un `Promise<Object>` con los siguientes campos:

- `file_id` (String): El ID del archivo subido.
- `job_id` (String): El ID del trabajo de finetuning, usado para consultar si el estado del procesamiento datos.
- `status` (String): El estado del trabajo de finetuning, `succeeded` cuando termine.
- `estimated_finish` (Number): La fecha estimada de finalización del trabajo (30 minutos a partir del envío por defecto), la fecha no es determinada, es estimada, usualmente se puede obtener un `null` como respuesta.

```json
{
  "file_id": "file-abc-123",
  "job_id": "job-abc-123",
  "status": "succeeded",
  "estimated_finish": 1726504568
}
```

- **Errores**

- Lanza un `Error` si:
  - El `payload` no es válido o no se puede desencriptar.
  - El archivo no se puede subir o no se puede crear el trabajo de finetuning.
  - El trabajo de finetuning no se puede crear o no se puede verificar su estado.

### Verificar el Entrenamiento

Se hace la llamada a este evento con el nombre de `**check_finetuning**` y hace uso del módulo `handleCheckFinetuning`.

Verifica el estado de un trabajo de finetuning dado su ID.

- **Parámetros**

- `id` (String): El ID del trabajo de finetuning que se desea verificar.

- **Ejemplo de uso**

```json
{
  "payload": {
    // Datos encriptados
  },
  "body": {
    "event": "check_finetuning", // nombre del evento
    "id": "job-abc-123" // ID del trabajo a verificar
  }
}
```

- **Retorna**

Un `Object` con la siguiente estructura:

- `status` (String): El estado del trabajo de finetuning (`succeeded`, `in_progress`, `failed`, etc.).
- `model` (String): El ID del modelo generado por el finetuning.
- `estimated_finish` (Number): La fecha estimada de finalización del trabajo (en formato timestamp), sólo aparecerá si el estatus es `succeeded`.

```json
{
  "status": "succeeded",
  "model": "tunning-abc-123",
  "estimated_finish": 1726504568
}
```

- **Errores**

- Lanza un `Error` si:
  - El `id` no es válido o no se puede verificar el estado del trabajo.
  - El trabajo de finetuning no se pudo crear o no se puede verificar su estado.

### Crear Hilo

Se hace la llamada a este evento con el nombre de `**create_thread**` y hace uso del módulo `handleCreateThread`.

Crea un nuevo hilo utilizando la API de OpenAI.

- **Retorna**

Un `Promise<Object>` con los datos de respuesta de la API de OpenAI.

- **Ejemplo de uso**

```json
{
  "payload": {
    // Datos encriptados
  },
  "body": {
    "event": "create_thread" // nombre del evento
  }
}
```

- **Errores**

- Lanza un `Error` si:
  - La solicitud a la API falla.
