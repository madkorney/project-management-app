import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import { AuthInfoType, AuthSuccessfulType, UserSignUpType, UserType } from 'types';
import { baseApiSlice } from './baseApi';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AuthSuccessfulType, AuthInfoType>({
      query: (credentials) => ({
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.SIGNIN}`,
        method: REQUEST_METHODS.POST,
        body: credentials,
      }),
    }),
    signUp: build.mutation<UserType, UserSignUpType>({
      query: (newUser) => ({
        url: `${ENDPOINTS.AUTH}${ENDPOINTS.SIGNUP}`,
        method: REQUEST_METHODS.POST,
        body: newUser,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
