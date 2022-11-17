import { baseApiSlice } from './baseApi';
import { UserFullInfoType, UsersArrayType, UserType } from 'types';
import { REQUEST_METHODS, ENDPOINTS } from 'data/constants';

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersArrayType, void>({
      query: () => ENDPOINTS.USERS,
    }),
    getUserById: build.query<UserType, string>({
      query: (userId) => `${ENDPOINTS.USERS}/${userId}`,
    }),
    updateUserById: build.mutation<UserType, UserFullInfoType>({
      query: ({ _id: userId, ...newParams }) => ({
        url: `${ENDPOINTS.USERS}/${userId}`,
        method: REQUEST_METHODS.PUT,
        body: newParams,
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
