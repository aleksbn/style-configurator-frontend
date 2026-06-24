import axios from "axios";

const ApiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_COLOR_API_URL}`,
  timeout: 5000,

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
    ApiAxios.get(url).then((response) => Api.handleResponse(response, null)),

  // CUSTOM CALLS
  getColorName(hex: string) {
    return Api.get("/id?hex=" + hex);
  },
};

export { Api };
