import { HttpMethodEnum, UrlEnum } from '../constants';
import { UsersArrayType, UserSignUpType, UserType } from 'types';
import { baseApiSlice } from './baseApi';

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersArrayType, unknown>({
      query: () => UrlEnum.USERS,
    }),
    getUserById: build.query<UserType, string>({
      query: (id) => `${UrlEnum.USERS}/${id}`,
    }),
    updateUserById: build.mutation<UserType, { id: string } & UserSignUpType>({
      query: ({ id, name, login, password }) => ({
        url: `${UrlEnum.USERS}/${id}`,
        method: HttpMethodEnum.PUT,
        body: { name, login, password },
      }),
    }),
    deleteUserById: build.mutation<UserType, string>({
      query: (id) => ({
        url: `${UrlEnum.USERS}/${id}`,
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
