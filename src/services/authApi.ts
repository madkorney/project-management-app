import { HttpMethodEnum, UrlEnum } from '../constants';
import { AuthInfoType, AuthSuccessfulType, UserSignUpType, UserType } from 'types';
import { baseApiSlice } from './baseApi';

export const authApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<AuthSuccessfulType, AuthInfoType>({
      query: (credentials) => ({
        url: `${UrlEnum.AUTH}${UrlEnum.SIGNIN}`,
        method: HttpMethodEnum.POST,
        body: credentials,
      }),
    }),
    signUp: build.mutation<UserType, UserSignUpType>({
      query: (newUser) => ({
        url: `${UrlEnum.AUTH}${UrlEnum.SIGNUP}`,
        method: HttpMethodEnum.POST,
        body: newUser,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
