import axios from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { EMethodsEnum } from '../../enums/methods.enum';

export default class ConnectionAPI {
  static async call<T, S>(url: string, method: string, body?: S | unknown): Promise<T> {
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
      default:
        return (await axios.delete<T>(url)).data;
    }
  }

  static async connect<T, S>(url: string, method: string, body?: S | unknown): Promise<T> {
    return ConnectionAPI.call<T, S>(url, method, body).catch((error) => {
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
      throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, EMethodsEnum.GET);
};

export const connectionAPIPost = async <T, S>(url: string, body: S): Promise<T> => {
  return ConnectionAPI.connect(url, EMethodsEnum.POST, body);
};

export const connectionAPIPut = async <T, S>(url: string, body: S): Promise<T> => {
  return ConnectionAPI.connect(url, EMethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T, S>(url: string, body: S): Promise<T> => {
  return ConnectionAPI.connect(url, EMethodsEnum.PUT, body);
};

export const connectionAPIDelete = async <T>(url: string): Promise<T> => {
  return ConnectionAPI.connect(url, EMethodsEnum.DELETE);
};
