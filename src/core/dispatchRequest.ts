import { AxiosPromise, AxiosRequestConfig, AxiosResponce } from "../types";
import xhr from "./request";
import { buildUrl } from "../helpers/url";
import { transformRequest, transformResponce } from "../helpers/data";
import { flattenHeaders, processHeaders } from "../helpers/headers";

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponceData(res);
  });
}

function processConfig(config: AxiosRequestConfig) {
  config.url = transformParams(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformParams(config: AxiosRequestConfig) {
  const { url, params } = config;
  return buildUrl(url!, params);
}

function transformRequestData(config: AxiosRequestConfig) {
  return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig) {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponceData(config: AxiosResponce): AxiosResponce {
  config.data = transformResponce(config.data);

  return config;
}

export default dispatchRequest;
