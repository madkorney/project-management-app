import { configureStore } from '@reduxjs/toolkit';
import { baseApiSlice } from 'services';
import authSliceReducer from './authSlice';
import showPasswordReducer from './showUserPasswordSlice';
import authorizedReducer from './authorizedSlice';

const reducer = {
  auth: authSliceReducer,
  password: showPasswordReducer,
  authorized: authorizedReducer,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
};
export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});
