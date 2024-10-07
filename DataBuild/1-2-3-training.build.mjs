import { trainFileJSONL } from "../chat/functions.chat.mjs";
import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";
import conversation from "../Treainer/training-data.jsonl.mjs";


  try {
    const data = {
      event: "train",
      payload: payloadToken(),
      body: conversation,
    };
    const response = await trainFileJSONL(data);
    console.log(response);
  } catch (error) {
    console.error(error.message);
  }
