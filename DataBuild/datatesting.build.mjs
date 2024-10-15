import axios from "axios";
import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";

(async () => {
  try {
    const { data } = await axios.post("http://127.0.0.1:3080/lambda", {
      payload: payloadToken(),
      body: {
        event_name: "messaging",
        threadID: "thread_TpmgvOxBHavUidGcYaRcuiHE",
        botID: "asst_ckOQC4muU5RHgbEGVIXoXG6j",
        message: "En qué aportó?",
      },
    });
    console.log(data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
})();
