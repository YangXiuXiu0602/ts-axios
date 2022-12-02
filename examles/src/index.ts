import axios from "../../src/index";
console.log(
  axios({
    url: "localhost:8000",
    method: "post",
    params: {}
  })
);
console.log("123");
