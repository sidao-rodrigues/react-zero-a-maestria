import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategoryType } from '../../../shared/types/CategoryType';

// Define a type for the slice state
interface ICategoryState {
  categories: ICategoryType[];
}

// Define the initial state using that type
const initialState: ICategoryState = {
  categories: [],
};

export const categorySlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    setCategoriesAction: (state, action: PayloadAction<ICategoryType[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategoriesAction } = categorySlice.actions;

export default categorySlice.reducer;
