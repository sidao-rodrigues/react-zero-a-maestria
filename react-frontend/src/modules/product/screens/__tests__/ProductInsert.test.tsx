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

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../category/hooks/useCategory', () => ({
  useCategory: () => ({
    categories: [],
  }),
}));

let value = '',
  type = '';

const mockButtonInsert = jest.fn();

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
    handleInsertProduct: mockButtonInsert,
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

  it('should call handleInsertProduct in click insert button', () => {
    const { getByTestId } = render(<ProductInsert />);

    const button = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT);

    fireEvent.click(button);

    expect(mockButtonInsert).toHaveBeenCalled();
  });

  it('should call navigate when click cancel button', () => {
    const { getByTestId } = render(<ProductInsert />);

    const button = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL);

    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalled();
  });

  // it('should validate props', async () => {
  //   const { getByTestId } = render(<ProductInsert />);

  //   const button = getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT);
  //   screen.debug(button);
  //   expect(button).toBeDisabled();

  //   // expect(button).not.toHaveAttribute('disabled');
  //   // expect(button).not.toBeDisabled();
  // });
});
