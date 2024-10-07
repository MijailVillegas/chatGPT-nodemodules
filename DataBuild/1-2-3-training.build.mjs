import axios from "axios";
import { convertToJSONL } from "../chat/1-upload-file.chat.mjs";
import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";
import conversation_incomplete from "../Treainer/training-incomplete-data.jsonl.mjs";
import gptInstance from "../Axios/axiosDefaultConf.mjs";

(async () => {
  try {
    const data = {
      event: "train",
      payload: payloadToken(),
      body: conversation_incomplete,
    };

    axios.post("/lambda", data);

    console.log(JSON.stringify(data, null, 2));
    console.log(train);
  } catch (error) {
    console.error(error.message);
  }
})();