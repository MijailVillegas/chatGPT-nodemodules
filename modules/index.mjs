import { handleTrain } from "./Handlers/train.handler.mjs";
import { handleCheckTrain } from "./Handlers/checkTrain.handler.mjs";
import { handleNewThread } from "./Handlers/thread.handler.mjs";
import { handleMessaging } from "./Handlers/messaging.handler.mjs";
import { handleBot } from "./Handlers/newBot.handler.mjs";
import { handleBotRoutine } from "./Handlers/botRoutine.handler.mjs";
import { handleCredendials } from "./Handlers/checkCredentials.handler.mjs";
import { isAuthenticated } from "../chat/functions.chat.mjs";

const eventHandlers = {
  train: handleTrain /* Paso 1, 2 o 3 */,
  check_train: handleCheckTrain /* Paso 3 */,
  new_thread: handleNewThread /* Paso 5 */,
  messaging: handleMessaging /* Paso 6, 7, 8 o 9*/,
  new_bot: handleBot,
  bot_routine: handleBotRoutine,
  check_credentials: handleCredendials,
};

/**
 * Entry point for all API Gateway requests. Routes the request to the
 * corresponding event handler.
 *
 * @param {Object} event - The event object passed by API Gateway.
 * @param {Object} event.payload - The payload encrypted by the client.
 * @param {Object} event.body - The body of the request.
 *
 * @returns {Promise<Object>} - The response object.
 */
export const handler = async (event) => {
  const { payload, body } = event;

  if (!isAuthenticated(payload))
    return { status: 401, message: "unauthorized" };

  const handler = eventHandlers[body.event_name];
  if (!handler) return { status: 400, message: "Invalid event" };

  try {
    console.log(`Handling event: ${body.event_name}`);
    console.log({ payload: payload, body: body });
    if (handler.length > 0) {
      return await handler({ payload: event.payload, body: event.body });
    } else {
      return await handler();
    }
  } catch (error) {
    return { status: error.status || 500, message: error.message };
  }
};
