import axios, { type AxiosResponse } from "axios";

const ApiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_COLOR_API_URL}`,
  timeout: 5000,

  validateStatus: function (status) {
    return status >= 200 && status <= 299;
  },
});

interface IApiErrorBody {
  errors?: unknown[];
  exception?: string;
}

function handleResponse<T>(response: AxiosResponse<T & IApiErrorBody>): T {
  const { data } = response;
  if (data.errors && data.errors.length > 0) {
    if (data.exception === "Exception") {
      throw new Error("An unknown error occurred");
    }
    throw new Error(JSON.stringify(data.errors));
  }
  return data;
}

interface IColorApiResponse {
  name: { value: string };
}

const Api = {
  get: <T>(url: string): Promise<T> =>
    ApiAxios.get<T & IApiErrorBody>(url).then((response) =>
      handleResponse(response),
    ),

  // CUSTOM CALLS
  getColorName(hex: string) {
    return Api.get<IColorApiResponse>("/id?hex=" + hex);
  },
};

export default Api;
