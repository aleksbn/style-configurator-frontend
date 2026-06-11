import axios from "axios";

// internal axios instance; not exported to avoid interfering with Fast Refresh
const ApiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 50000,

  validateStatus: function (status) {
    return status >= 200 && status <= 299;
  },
});

const Api = {
  handleResponse(response: any, transformation: any) {
    if (response.data.errors?.length > 0) {
      if (response.data.exception === "Exception") {
        throw [];
      }
      throw response.data.errors;
    }

    if (transformation) {
      return transformation(response.data.res);
    }
    return response.data;
  },
  get: (url: string) =>
    Promise.resolve(true)
      .then(() => {
        return ApiAxios.get(`${import.meta.env.VITE_BACKEND_URL}${url}`);
      })
      .then((response) => {
        return Api.handleResponse(response, null);
      }),
  post: (url: string, data: any) =>
    Promise.resolve(true).then(() => {
      return ApiAxios.post(`${import.meta.env.VITE_BACKEND_URL}${url}`, data);
    }),
  // CUSTOM CALLS
  getAllModelsContent() {
    return Api.get("/models");
  },

  getSinglePrice(configKey: string) {
    return Api.get(`/price/calculate/${configKey}`);
  },
};

export default Api;
