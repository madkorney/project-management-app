import { baseApiSlice } from './baseApi';
import { AuthInfoType, AuthSuccessfulType, UserSignUpType, UserType } from 'types';
import { REQUEST_METHODS, ENDPOINTS } from 'data/constants';

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
