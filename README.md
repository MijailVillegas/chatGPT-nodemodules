# API Gateway Lambda Handler

Este repositorio contiene la implementación de un handler para una Lambda Function que procesa distintos eventos recibidos a través de API Gateway. El handler distribuye las solicitudes a diferentes funciones en función del tipo de evento especificado en el cuerpo de la solicitud.

## Requisitos

- Node.js: versión 16 o superior.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal:

## Descripción General

El archivo principal es el `handler`, que sirve como punto de entrada para todas las solicitudes. La función `handler` se asegura de que las solicitudes pasen por una autenticación antes de redirigirlas a la función de manejo de eventos correspondiente, basada en el nombre del evento.

## Estructura del Código

### Módulos Importados

- **handleTrain**: Maneja los eventos relacionados con el entrenamiento de modelos (paso 1, 2 o 3).
- **handleCheckTrain**: Revisa el estado del entrenamiento de un modelo (paso 3).
- **handleNewThread**: Crea un nuevo hilo de mensajes (paso 5).
- **handleMessaging**: Gestiona la mensajería dentro de un hilo existente (paso 6, 7, 8 o 9).
- **handleBot**: Crea un nuevo bot.
- **handleBotRoutine**: Ejecuta una rutina programada para un bot.
- **handleCredentials**: Verifica las credenciales enviadas.
- **isAuthenticated**: Función que verifica si el `payload` enviado está autenticado correctamente.
