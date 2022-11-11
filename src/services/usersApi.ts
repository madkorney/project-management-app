import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import { UsersArrayType, UserSignUpType, UserType } from 'types';
import { baseApiSlice } from './baseApi';

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersArrayType, unknown>({
      query: () => ENDPOINTS.USERS,
    }),
    getUserById: build.query<UserType, string>({
      query: (userId) => `${ENDPOINTS.USERS}/${userId}`,
    }),
    updateUserById: build.mutation<UserType, { userId: string } & UserSignUpType>({
      query: ({ userId, name, login, password }) => ({
        url: `${ENDPOINTS.USERS}/${userId}`,
        method: REQUEST_METHODS.PUT,
        body: { name, login, password },
      }),
    }),
    deleteUserById: build.mutation<UserType, string>({
      query: (userId) => ({
        url: `${ENDPOINTS.USERS}/${userId}`,
        method: REQUEST_METHODS.DELETE,
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
