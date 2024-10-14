import axios from "axios";
import { payloadToken } from "../modules/Libraries/cryptography/Client/token.cryp.mjs";

(async () => {
  try {
    const { data } = await axios.post("http://127.0.0.1:3080/lambda", {
      payload: payloadToken(),
      body: { event_name: "new_thread" },
    });
    console.log(data);
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
  }
})();

