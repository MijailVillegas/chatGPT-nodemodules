import axios from "axios";
import { prompt2_PEI_optimized } from "../prompts/prompt-openai-PEI.optimize.mjs";
import { jsonFilter } from "../modules/Libraries/Cleaners/jsonExtract.mjs";
import { promtp3_PM_optimize } from "../prompts/prompt-openai-PM.optimize.mjs";

var options = {
  method: "POST",
  url: "https://88q6zcaxq8.execute-api.us-east-2.amazonaws.com/Testing/",
  /* url: "http://127.0.0.1:3000/lambda", */
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  data: promtp3_PM_optimize,
};

axios
  .request(options)
  .then(function (response) {
    console.log(JSON.stringify(response.data.body));
    console.log(JSON.stringify(response.data.recived));
    /* console.log(response.data.body); */
  })
  .catch(function (error) {
    console.log("error from lambda ptition")
    console.log(error.response ? error.response.data : error.message);
  });
