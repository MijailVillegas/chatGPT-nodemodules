import axios from "axios";
import { prompt2_PEI_optimized } from "../prompts/prompt-openai-PEI.optimize.mjs";
import { jsonFilter } from "../modules/Libraries/Cleaners/jsonExtract.mjs";

var options = {
  method: "POST",
  url: "https://88q6zcaxq8.execute-api.us-east-2.amazonaws.com/Testing/",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  data: prompt2_PEI_optimized,
};

axios
  .request(options)
  .then(function (response) {
    console.log(JSON.stringify(response.data.body));
  })

  .catch(function (error) {
    console.log("error from lambda ptition")
    console.log(error.response ? error.response.data : error.message);
  });
