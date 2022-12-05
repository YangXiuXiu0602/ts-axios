import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponce,
  Method,
  RejectedFn,
  ResolvedFn
} from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManage from "./interceptorManage";
import mergeConfig from "./mergeConfig";

interface Interceptors {
  request: InterceptorManage<AxiosRequestConfig>;
  responce: InterceptorManage<AxiosResponce>;
}

interface InterceptorChain<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectedFn;
}

class Axios {
  interceptors: Interceptors;
  defaults: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig) {
    this.defaults = config;
    this.interceptors = {
      request: new InterceptorManage(),
      responce: new InterceptorManage()
    };
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === "string") {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: InterceptorChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });

    this.interceptors.responce.forEach(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;

      promise = promise.then(resolved, rejected);
    }

    return promise;
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, "get", config);
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, "options", config);
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, "head", config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData(url, "delete", config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData(url, "post", data, config);
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData(url, "patch", data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this._requestMethodWithData(url, "put", data, config);
  }

  _requestMethodWithoutData(url: string, method: Method, config?: AxiosRequestConfig) {
    return this.request({
      url,
      method,
      ...config
    });
  }

  _requestMethodWithData(url: string, method: Method, data?: any, config?: AxiosRequestConfig) {
    return this.request({
      url,
      method,
      data,
      ...config
    });
  }
}

export default Axios;
