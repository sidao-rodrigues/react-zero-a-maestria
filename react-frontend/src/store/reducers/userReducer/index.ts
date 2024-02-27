import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserType } from '../../../modules/login/types/UserType';

// Define a type for the slice state
interface IUserState {
  users: IUserType[];
}

// Define the initial state using that type
const initialState: IUserState = {
  users: [],
};

export const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUsersAction: (state, action: PayloadAction<IUserType[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsersAction } = userSlice.actions;

export default userSlice.reducer;
