import { handleTrain } from "./modules/Handlers/train.handler.mjs";
import { handleCheckTrain } from "./modules/Handlers/checkTrain.handler.mjs";
import { handleNewThread } from "./modules/Handlers/thread.handler.mjs";
import { handleMessaging } from "./modules/Handlers/messaging.handler.mjs";
import { handleBot } from "./modules/Handlers/newBot.handler.mjs";
import { handleBotRoutine } from "./modules/Handlers/botRoutine.handler.mjs";
import { handleCredendials } from "./modules/Handlers/checkCredentials.handler.mjs";
import { isAuthenticated } from "./chat/functions.chat.mjs";
import { handleTrainIncubation } from "./modules/Handlers/trainIncubation.handler.mjs";

const eventHandlers = {
  train: handleTrain,
  train_incubation: handleTrainIncubation,
  check_train: handleCheckTrain,
  new_thread: handleNewThread,
  messaging: handleMessaging,
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
    const result = await handler({ payload: event.payload, body: event.body });
    return {
      status: 200,
      event: body.event_name,
      ...result,
    };
  } catch (error) {
    return { status: error.status || 500, message: error.message };
  }
};
