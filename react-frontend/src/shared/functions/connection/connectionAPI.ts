import axios, { AxiosRequestConfig } from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { EMethodsEnum } from '../../enums/methods.enum';
import { getAuthorizationToken } from './auth';

export type TMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';

export default class ConnectionAPI {
  static async call<T, S>(url: string, method: TMethodType, body?: S | unknown): Promise<T> {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: getAuthorizationToken(),
        'Content-Type': 'application/json',
      },
    };

    switch (method) {
      case EMethodsEnum.POST:
      case EMethodsEnum.PUT:
      case EMethodsEnum.PATCH:
        return (await axios[method]<T>(url, body, config)).data;
      case EMethodsEnum.GET:
      case EMethodsEnum.DELETE:
      default:
        return (await axios[method]<T>(url, config)).data;
    }
  }

  static async connect<T, S>(url: string, method: TMethodType, body?: S | unknown): Promise<T> {
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
