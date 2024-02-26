import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOrderType } from './../../../shared/types/OrderType';

// Define a type for the slice state
interface IOrderState {
  orders: IOrderType[];
  order?: IOrderType;
}

// Define the initial state using that type
const initialState: IOrderState = {
  orders: [],
  order: undefined,
};

export const orderSlice = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    setOrdersActions: (state, action: PayloadAction<IOrderType[]>) => {
      state.orders = action.payload;
    },
    setOrderActions: (state, action: PayloadAction<IOrderType>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrdersActions, setOrderActions } = orderSlice.actions;

export default orderSlice.reducer;
