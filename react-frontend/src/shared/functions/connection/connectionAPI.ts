import axios from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { EMethodsEnum } from '../../enums/methods.enum';

export default class ConnectionAPI {
  static async call<T>(url: string, method: string, body?: unknown) {
    switch (method) {
      case EMethodsEnum.GET:
        return (await axios.get<T>(url)).data;
      case EMethodsEnum.POST:
        return (await axios.post<T>(url, body)).data;
      case EMethodsEnum.PUT:
        return (await axios.put<T>(url, body)).data;
      case EMethodsEnum.PATCH:
        return (await axios.patch<T>(url, body)).data;
      case EMethodsEnum.DELETE:
        return (await axios.delete<T>(url)).data;
    }
  }

  static async connect<T>(url: string, method: string, body?: unknown) {
    return ConnectionAPI.call<T>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
          case 404:
            throw new Error(error.response.data.message ?? ERROR_ACCESS_DANIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
    });
  }
}

export const connectionAPIGet = async <T>(url: string) => {
  return ConnectionAPI.connect(url, EMethodsEnum.GET) as T;
};

export const connectionAPIPost = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect(url, EMethodsEnum.POST, body) as T;
};

export const connectionAPIPut = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect(url, EMethodsEnum.PUT, body) as T;
};

export const connectionAPIPatch = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect(url, EMethodsEnum.PUT, body) as T;
};

export const connectionAPIDelete = async <T>(url: string) => {
  return ConnectionAPI.connect(url, EMethodsEnum.DELETE) as T;
};
