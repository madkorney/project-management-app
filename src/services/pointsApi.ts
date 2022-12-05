import { baseApiSlice } from './baseApi';
import {
  PointType,
  PointParamsType,
  PointUpdateParamsType,
  PointsListType,
  PointsSetUpdateParamsType,
} from 'types';
import { REQUEST_METHODS, ENDPOINTS } from 'data/constants';

export const pointsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPointsByPointsIdsOrUserId: build.query<
      PointsListType,
      { pointsIds: string[]; userId: string }
    >({
      query: ({ pointsIds, userId }) => ({
        url: ENDPOINTS.POINTS,
        params: {
          ids: pointsIds.join(','),
          userId,
        },
      }),
    }),
    createPoint: build.mutation<PointType, PointParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.POINTS,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
    }),
    updatePointsSet: build.mutation<PointsListType, PointsSetUpdateParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.POINTS,
        method: REQUEST_METHODS.PATCH,
        body: newParams,
      }),
    }),
    getPointByTaskId: build.query<PointType, string>({
      query: (taskId) => `${ENDPOINTS.POINTS}/${taskId}`,
    }),
    updatePointById: build.mutation<PointType, PointUpdateParamsType>({
      query: ({ _id: pointId, ...newParams }) => ({
        url: `${ENDPOINTS.POINTS}/${pointId}`,
        method: REQUEST_METHODS.PUT,
        body: { pointId, ...newParams },
      }),
    }),
    deletePointById: build.mutation<PointType, string>({
      query: (pointId) => ({
        url: `${ENDPOINTS.POINTS}/${pointId}`,
        method: REQUEST_METHODS.DELETE,
      }),
    }),
  }),
});

export const {
  useGetPointsByPointsIdsOrUserIdQuery,
  useCreatePointMutation,
  useUpdatePointsSetMutation,
  useGetPointByTaskIdQuery,
  useUpdatePointByIdMutation,
  useDeletePointByIdMutation,
} = pointsApiSlice;
