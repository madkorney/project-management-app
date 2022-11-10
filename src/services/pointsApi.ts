import { HttpMethodEnum, UrlEnum } from '../constants';
import {
  PointType,
  PointParamsType,
  PointUpdateParamsType,
  PointsListType,
  PointsSetUpdateParamsType,
} from 'types';
import { baseApiSlice } from './baseApi';

export const pointsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPointsByPointsIdsOrUserId: build.query<
      PointsListType,
      { pointsIds: string[]; userId: string }
    >({
      query: ({ pointsIds, userId }) => ({
        url: UrlEnum.POINTS,
        params: {
          ids: pointsIds.join(','),
          userId,
        },
      }),
    }),
    createPoint: build.mutation<PointType, PointParamsType>({
      query: (newParams) => ({
        url: UrlEnum.POINTS,
        method: HttpMethodEnum.POST,
        body: newParams,
      }),
    }),
    updatePointsSet: build.mutation<PointsListType, PointsSetUpdateParamsType>({
      query: (newParams) => ({
        url: UrlEnum.POINTS,
        method: HttpMethodEnum.PATCH,
        body: newParams,
      }),
    }),
    getPointByTaskId: build.query<PointType, string>({
      query: (taskId) => `${UrlEnum.POINTS}/${taskId}`,
    }),
    updatePointById: build.mutation<PointType, { pointId: string } & PointUpdateParamsType>({
      query: ({ pointId, ...newParams }) => ({
        url: `${UrlEnum.POINTS}/${pointId}`,
        method: HttpMethodEnum.PUT,
        body: { pointId, ...newParams },
      }),
    }),
    deletePointById: build.mutation<PointType, string>({
      query: (pointId) => ({
        url: `${UrlEnum.POINTS}/${pointId}`,
        method: HttpMethodEnum.DELETE,
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
