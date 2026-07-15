import axios, { type AxiosResponse } from "axios";
import type { ICartItem } from "../models/Cart";
import type { IModelsData, IPriceBreakdown } from "../models/Model";
import type { IPdfCartItem } from "../models/Pdf";

// internal axios instance; not exported to avoid interfering with Fast Refresh
const ApiAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  timeout: 50000,

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

interface ICartTotal {
  totalPrice: number;
  note: string;
}

const Api = {
  get: <T>(url: string): Promise<T> =>
    ApiAxios.get<T & IApiErrorBody>(
      `${import.meta.env.VITE_BACKEND_URL}${url}`,
    ).then((response) => handleResponse(response)),

  post: <T>(url: string, data: unknown): Promise<AxiosResponse<T>> =>
    ApiAxios.post<T>(`${import.meta.env.VITE_BACKEND_URL}${url}`, data),

  // CUSTOM CALLS
  getAllModelsContent() {
    return Api.get<IModelsData>("/models");
  },

  getSinglePrice(configKey: string) {
    return Api.get<IPriceBreakdown>(`/price/calculate/${configKey}`);
  },

  getCartPrices(cartItems: { cart: ICartItem[] }) {
    return Api.post<ICartTotal>("/price/calculate/cart", cartItems);
  },

  getPdfContent(cartItems: { cart: ICartItem[] }) {
    return Api.post<IPdfCartItem[]>("/pdf", cartItems);
  },

  createConfiguration(configKey: string) {
    return Api.post<unknown>("/configurations", { configKey });
  },
};

export default Api;
