import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { AUTHORIZATION_KEY } from '../../../constants/authorizationConstants';
import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../../constants/errorsStatus';
import { URL_AUTH } from '../../../constants/urls';
import { EMethodsEnum } from '../../../enums/methods.enum';
import ConnectionAPI, {
  connectionAPIDelete,
  connectionAPIGet,
  connectionAPIPatch,
  connectionAPIPost,
  connectionAPIPut,
} from '../connectionAPI';

const mockAxios = new MockAdapter(axios);

const RETURN_VALUE = 'returnValue';
const TOKEN_MOCK = 'TOKEN_MOCK';
const BODY_MOCK = { name: 'BODY_MOCK' };
const ERRO_MOCK = { response: { data: { message: ERROR_ACCESS_DANIED } } };

describe('connectionAPI function', () => {
  describe('connectionAPIGet', () => {
    it('should success get', async () => {
      const spyAxios = jest.spyOn(axios, 'get');
      mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await connectionAPIGet(URL_AUTH);

      expect(returnGet).toEqual(RETURN_VALUE);
      expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH);
    });
  });

  describe('connectionAPIDelete', () => {
    it('should success delete', async () => {
      const spyAxios = jest.spyOn(axios, 'delete');

      mockAxios.onDelete(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await connectionAPIDelete(URL_AUTH);

      expect(returnGet).toEqual(RETURN_VALUE);
      expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH);
    });
  });

  describe('connectionAPIPost', () => {
    it('should success post', async () => {
      const spyAxios = jest.spyOn(axios, 'post');
      mockAxios.onPost(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await connectionAPIPost(URL_AUTH, BODY_MOCK);

      expect(returnGet).toEqual(RETURN_VALUE);

      expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH);
      expect(spyAxios.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('connectionAPIPatch', () => {
    it('should success patch', async () => {
      const spyAxios = jest.spyOn(axios, 'patch');
      mockAxios.onPatch(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await connectionAPIPatch(URL_AUTH, BODY_MOCK);

      expect(returnGet).toEqual(RETURN_VALUE);

      expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH);
      expect(spyAxios.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('connectionAPIPut', () => {
    it('should success put', async () => {
      const spyAxios = jest.spyOn(axios, 'put');
      mockAxios.onPut(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await connectionAPIPut(URL_AUTH, BODY_MOCK);

      expect(returnGet).toEqual(RETURN_VALUE);

      expect(spyAxios.mock.calls[0][0]).toEqual(URL_AUTH);
      expect(spyAxios.mock.calls[0][1]).toEqual(BODY_MOCK);
    });
  });

  describe('test connect', () => {
    it('should return success', async () => {
      mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE);

      const returnGet = await ConnectionAPI.connect(URL_AUTH, EMethodsEnum.GET);

      expect(returnGet).toEqual(RETURN_VALUE);
    });

    it('should return error 401', async () => {
      mockAxios.onGet(URL_AUTH).reply(401, ERRO_MOCK);

      expect(ConnectionAPI.connect(URL_AUTH, EMethodsEnum.GET)).rejects.toThrow(
        Error(ERRO_MOCK.response.data.message ?? ERROR_ACCESS_DANIED),
      );
    });

    it('should return error 403', async () => {
      mockAxios.onGet(URL_AUTH).reply(403, ERRO_MOCK);

      expect(ConnectionAPI.connect(URL_AUTH, EMethodsEnum.GET)).rejects.toThrow(
        Error(ERRO_MOCK.response.data.message ?? ERROR_ACCESS_DANIED),
      );
    });
    it('should return error 400', async () => {
      mockAxios.onGet(URL_AUTH).reply(400);

      expect(ConnectionAPI.connect(URL_AUTH, EMethodsEnum.GET)).rejects.toThrow(
        Error(ERROR_CONNECTION),
      );
    });
    it('should return error netWorkErro', async () => {
      mockAxios.onGet(URL_AUTH).networkError();

      expect(ConnectionAPI.connect(URL_AUTH, EMethodsEnum.GET)).rejects.toThrow(
        Error(ERROR_CONNECTION),
      );
    });
  });

  describe('test call', () => {
    it('should header not send authorization', async () => {
      const spyAxios = jest.spyOn(axios, 'get');
      mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE);

      await ConnectionAPI.call<string, string>(URL_AUTH, EMethodsEnum.GET);

      expect(spyAxios.mock.calls[0][1]?.headers?.Authorization).toEqual(null);
      expect(spyAxios.mock.calls[0][1]?.headers?.['Content-Type']).toEqual('application/json');
    });

    it('should header send authorization', async () => {
      localStorage.setItem(AUTHORIZATION_KEY, TOKEN_MOCK);

      const spyAxios = jest.spyOn(axios, 'get');
      mockAxios.onGet(URL_AUTH).reply(200, RETURN_VALUE);

      await ConnectionAPI.call<string, string>(URL_AUTH, EMethodsEnum.GET);

      expect(spyAxios.mock.calls[0][1]?.headers?.Authorization).toEqual(null);
      expect(spyAxios.mock.calls[0][1]?.headers?.['Content-Type']).toEqual('application/json');
    });
  });
});
