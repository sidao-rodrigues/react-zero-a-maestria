//libs and commmands

import { render } from '@testing-library/react';

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

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    loading: false,
    disabledButton: false,
    product: mockProductInsert,
    handleOnChangeInput: jest.fn(),
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
});
