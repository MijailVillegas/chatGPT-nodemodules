import trainFileJSONL from "../../chat/functions.chat.mjs";
import {
  buildAnswers,
  buildCompletitions,
  concat,
} from "../DataBuilder/IncubationBuilder.mjs";
/**
 * @function handleTrain
 * Handles the request to train a custom language model with the provided data.
 * @param {Object} body - The request body.
 * @param {Array} body.fases - The list of fases to include in the training data.
 * @param {Array} body.completions - The list of completions to include in the training data.
 * @returns {Promise<Object>} - A promise that resolves to an object with the status and data of the training job.
 * @throws {Error} - If the payload is invalid or cannot be decrypted.
 * @throws {Error} - If the fine-tuning job cannot be created or its status cannot be verified.
 */
export const handleTrainIncubation = async (params) => {
  try {
    const { fases, completions } = params.body;

    if (!fases || !completions) {
      const error = new Error("Los campos fases y completions son requeridos.");
      error.statusCode = 400;
      throw error;
    }

    const trainableData = concat(
      buildAnswers(fases),
      buildCompletitions(completions)
    );

    const { status, ...data } = await trainFileJSONL(trainableData);
    return { status, event: "train", ...data };
  } catch (error) {
    return { status: error.statusCode || 500, message: error.message };
  }
};