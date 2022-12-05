import Axios from "./core/Axios";
import defaultConfig from "./default";
import { extend } from "./helpers/utils";
import { AxiosIntance, AxiosRequestConfig } from "./types";

function createInstance(config: AxiosRequestConfig): AxiosIntance {
  const context = new Axios(config);

  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosIntance;
}

const axios = createInstance(defaultConfig);

export default axios;
