import { AxiosRequestConfig } from "./types";

const defaultConfig: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};

const methodsNoData = ["get", "head", "options", "delete"];

methodsNoData.forEach(method => {
  defaultConfig.headers[method] = {};
});

const methodsWithData = ["post", "patch", "put"];

methodsWithData.forEach(method => {
  defaultConfig.headers[method] = "application/x-www-form-urlencoded";
});

export default defaultConfig;
