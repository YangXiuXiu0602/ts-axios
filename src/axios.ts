import Axios from "./core/Axios";
import { extend } from "./helpers/utils";
import { AxiosIntance } from "./types";

function createInstance(): AxiosIntance {
  const context = new Axios();

  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosIntance;
}

const axios = createInstance();

export default axios;
