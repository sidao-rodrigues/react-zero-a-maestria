import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUserType } from '../../../modules/login/types/UserType';
import { INotificationType } from '../../../shared/types/NotificationType';

interface IGlobalState {
  notification?: INotificationType;
  user?: IUserType;
}

const initialState: IGlobalState = {
  notification: undefined,
  user: undefined,
};

export const productSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<INotificationType>) => {
      state.notification = action.payload;
    },
    setUserAction: (state, action: PayloadAction<IUserType>) => {
      state.user = action.payload;
    },
  },
});

export const { setNotificationAction, setUserAction } = productSlice.actions;

export default productSlice.reducer;
