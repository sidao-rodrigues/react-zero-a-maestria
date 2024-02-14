import { configureStore } from '@reduxjs/toolkit';

import categoryReducer from './reducers/categoryReducer';
import globalReducer from './reducers/globalReducer';
import productReducer from './reducers/productReducer';

const store = configureStore({
  reducer: {
    globalReducer,
    productReducer,
    categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
