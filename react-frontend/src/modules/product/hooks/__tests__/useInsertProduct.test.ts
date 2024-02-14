/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react';

import { useInsertProduct } from '../useInsertProduct';

const mockNavigate = jest.fn();
const mockSetNotification = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../../store/reducers/globalReducer/useGlobalReducer', () => ({
  useGlobalReducer: () => ({
    setNotification: mockSetNotification,
  }),
}));

describe('Test userInsertProduct', () => {
  it('should return inital values', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.loading).toEqual(false);
    expect(result.current.disabledButton).toEqual(true);
    expect(result.current.product).toEqual({
      name: '',
      price: 0,
      image: '',
    });
  });

  it('should change select in handleOnChangeSelect', () => {
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleOnChangeSelect('4312');
    });

    expect(result.current.product.categoryId).toEqual(4312);
  });

  it('should change product in handleOnChangeInput send name', () => {
    const TEST_MOCK = 'TEST_MOCK';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current.handleOnChangeInput({ target: { value: TEST_MOCK } } as any, 'name');
    });

    expect(result.current.product.name).toEqual(TEST_MOCK);
  });

  it('should change product in handleOnChangeInput send price', () => {
    const TEST_MOCK = '3453';
    const { result } = renderHook(() => useInsertProduct());

    act(() => {
      result.current.handleOnChangeInput({ target: { value: TEST_MOCK } } as any, 'price', true);
    });

    expect(result.current.product.price).toEqual(Number(TEST_MOCK));
  });

  it('should change disabledButton in insert data', () => {
    const { result } = renderHook(() => useInsertProduct());

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleOnChangeInput({ target: { value: '4321' } } as any, 'price', true);
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleOnChangeInput({ target: { value: 'zezo' } } as any, 'name');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleOnChangeInput({ target: { value: 'http://img' } } as any, 'image');
    });

    expect(result.current.disabledButton).toEqual(true);

    act(() => {
      result.current.handleOnChangeSelect('4312');
    });

    expect(result.current.disabledButton).toEqual(false);

    act(() => {
      result.current.handleOnChangeInput({ target: { value: '' } } as any, 'image');
    });

    expect(result.current.disabledButton).toEqual(true);
  });
});
