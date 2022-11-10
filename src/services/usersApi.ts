import { HttpMethodEnum, UrlEnum } from '../constants';
import { UsersArrayType, UserSignUpType, UserType } from 'types';
import { baseApiSlice } from './baseApi';

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersArrayType, unknown>({
      query: () => UrlEnum.USERS,
    }),
    getUserById: build.query<UserType, string>({
      query: (userId) => `${UrlEnum.USERS}/${userId}`,
    }),
    updateUserById: build.mutation<UserType, { userId: string } & UserSignUpType>({
      query: ({ userId, name, login, password }) => ({
        url: `${UrlEnum.USERS}/${userId}`,
        method: HttpMethodEnum.PUT,
        body: { name, login, password },
      }),
    }),
    deleteUserById: build.mutation<UserType, string>({
      query: (userId) => ({
        url: `${UrlEnum.USERS}/${userId}`,
        method: HttpMethodEnum.DELETE,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserByIdMutation,
  useDeleteUserByIdMutation,
} = usersApiSlice;
