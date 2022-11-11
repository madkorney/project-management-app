import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'redux/types';
import { BASE_URL, UrlEnum } from '../constants';

export const baseApiSlice = createApi({
  reducerPath: 'pmaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const token = (getState() as RootState).auth.token;
      if (token && !endpoint.includes(UrlEnum.AUTH)) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      headers.set(
        'Content-Type',
        endpoint === 'uploadFile' ? 'multipart/form-data' : 'application/json'
      );
      return headers;
    },
  }),
  endpoints: () => ({}),
});
