import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductType } from '../../../shared/types/ProductType';

// Define a type for the slice state
interface IProductState {
  products: IProductType[];
  product?: IProductType;
}

// Define the initial state using that type
const initialState: IProductState = {
  products: [],
  product: undefined,
};

export const productSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<IProductType[]>) => {
      state.products = action.payload;
    },
    setProductAction: (state, action: PayloadAction<IProductType | undefined>) => {
      state.product = action.payload;
    },
  },
});

export const { setProductsAction, setProductAction } = productSlice.actions;

export default productSlice.reducer;
