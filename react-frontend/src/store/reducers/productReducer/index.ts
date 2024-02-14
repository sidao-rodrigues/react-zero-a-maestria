import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IProductType } from '../../../shared/types/ProductType';

// Define a type for the slice state
interface IProductState {
  products: IProductType[];
}

// Define the initial state using that type
const initialState: IProductState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    setProductsAction: (state, action: PayloadAction<IProductType[]>) => {
      state.products = action.payload;
    },
  },
});

export const { setProductsAction } = productSlice.actions;

export default productSlice.reducer;
