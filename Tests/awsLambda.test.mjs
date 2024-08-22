import axios from "axios";
import { promt_example } from "../response-examples/prompt-openai-PV.example.mjs";

var options = {
  method: "POST",
  url: "https://88q6zcaxq8.execute-api.us-east-2.amazonaws.com/Testing/",
  headers: {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json",
  },
  data: promt_example,
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
