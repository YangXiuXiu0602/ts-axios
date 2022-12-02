import { parseHeaders } from "./helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponce } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = "get", url, headers, responseType } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function() {
      if (request.readyState !== 4) return;

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const status = request.status;
      const statusText = request.statusText;
      const responseData = responseType === "text" ? request.responseText : request.response;
      const response: AxiosResponce = {
        data: responseData,
        status,
        statusText,
        headers: responseHeaders,
        config,
        request
      };

      resolve(response);
    };

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);
  });
}
