import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICategoryType } from '../../../shared/types/CategoryType';

// Define a type for the slice state
interface ICategoryState {
  categories: ICategoryType[];
  category?: ICategoryType;
}

// Define the initial state using that type
const initialState: ICategoryState = {
  categories: [],
  category: undefined,
};

export const categorySlice = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    setCategoriesAction: (state, action: PayloadAction<ICategoryType[]>) => {
      state.categories = action.payload;
    },
    setCategoryAction: (state, action: PayloadAction<ICategoryType | undefined>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategoriesAction, setCategoryAction } = categorySlice.actions;

export default categorySlice.reducer;
