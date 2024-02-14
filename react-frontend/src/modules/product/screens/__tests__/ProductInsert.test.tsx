//libs and commmands

import { fireEvent, render } from '@testing-library/react';

import { mockProductInsert } from '../../__mocks__/productInsert.mock';
import { ProductInsertTestIdEnum } from '../../enum/ProductInsertTestIdEnum';
import ProductInsert from '../ProductInsert';

/**
 * npm i jest @types/jest -D
 * npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event -D
 * npm i @babel/core @babel/preset-env @babel/preset-react babel-jest identity-obj-proxy jest-environment-jsdom -D
 * npm install --save-dev @babel/preset-typescript
 */

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../category/hooks/useCategory', () => ({
  useCategory: () => ({
    categories: [],
  }),
}));

let value = '',
  type = '';

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    loading: false,
    disabledButton: false,
    product: mockProductInsert,
    handleOnChangeInput: (e: React.ChangeEvent<HTMLInputElement>, x: string) => {
      value = e.target.value;
      type = x;
    },
    handleOnChangeSelect: jest.fn(),
    handleInsertProduct: jest.fn(),
  }),
}));

describe('Test Insert Product', () => {
  it('should render', () => {
    const { getByTestId } = render(<ProductInsert />);

    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE));
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT));
  });

  it('should call handleOnChangeInput in change name', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME);

    fireEvent.change(input, { target: { value: 'Mock name' } });

    expect(value).toEqual('Mock name');
    expect(type).toEqual('name');
  });

  it('should call handleOnChangeInput in change price', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE);

    fireEvent.change(input, { target: { value: `${mockProductInsert.price}` } });

    expect(value.replace('..', '.')).toEqual(`${mockProductInsert.price}`);
    expect(type).toEqual('price');
  });

  it('should call handleOnChangeInput in change image', () => {
    const { getByTestId } = render(<ProductInsert />);

    const input = getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE);

    fireEvent.change(input, { target: { value: 'http://image.com' } });

    expect(value).toEqual('http://image.com');
    expect(type).toEqual('image');
  });
});
