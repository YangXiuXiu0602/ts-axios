import { parseHeaders } from "../helpers/headers";
import { createError } from "../helpers/error";
import { AxiosPromise, AxiosRequestConfig, AxiosResponce } from "../types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = "get", url, headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

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

      handleResponce(response);
    };

    request.onerror = function() {
      reject(createError("Nerwork Error", config, null, request));
    };

    request.ontimeout = function() {
      reject(createError(`Timeout of ${timeout} exceeded`, config, "ECONNABORTED", request));
    };

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);

    const handleResponce = (response: AxiosResponce) => {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    };
  });
}
