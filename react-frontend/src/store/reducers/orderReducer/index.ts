import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrderType } from './../../../shared/types/OrderType';

// Define a type for the slice state
interface IOrderState {
  orders: IOrderType[];
}

// Define the initial state using that type
const initialState: IOrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    setOrdersActions: (state, action: PayloadAction<IOrderType[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrdersActions } = orderSlice.actions;

export default orderSlice.reducer;
