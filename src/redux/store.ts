import { configureStore } from '@reduxjs/toolkit';

import { baseApiSlice } from 'services';

import authSliceReducer from './authSlice';

const reducer = {
  auth: authSliceReducer,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
};

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
