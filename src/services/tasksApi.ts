import { REQUEST_METHODS, ENDPOINTS } from '../constants';
import {
  TaskType,
  TaskCreateParamsType,
  TaskUpdateParamsType,
  TasksSetType,
  TasksSetParamsType,
} from 'types';
import { baseApiSlice } from './baseApi';

export const tasksApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksSetType, { boardId: string; columnId: string }>({
      query: ({ boardId, columnId }) =>
        `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}/${ENDPOINTS.TASKS}`,
    }),
    createTask: build.mutation<
      TaskType,
      { boardId: string; columnId: string } & TaskCreateParamsType
    >({
      query: ({ boardId, columnId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}/${ENDPOINTS.TASKS}`,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
    }),
    getTaskById: build.query<TaskType, { boardId: string; columnId: string; taskId: string }>({
      query: ({ boardId, columnId, taskId }) =>
        `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}/${ENDPOINTS.TASKS}/${taskId}`,
    }),
    updateTaskById: build.mutation<
      TaskType,
      { boardId: string; taskId: string } & TaskUpdateParamsType
    >({
      query: ({ boardId, columnId, taskId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}/${ENDPOINTS.TASKS}/${taskId}`,
        method: REQUEST_METHODS.PUT,
        body: { columnId, ...newParams },
      }),
    }),
    deleteTaskById: build.mutation<TaskType, { boardId: string; columnId: string; taskId: string }>(
      {
        query: ({ boardId, columnId, taskId }) => ({
          url: `${ENDPOINTS.BOARDS}/${boardId}/${ENDPOINTS.COLUMNS}/${columnId}/${ENDPOINTS.TASKS}/${taskId}`,
          method: REQUEST_METHODS.DELETE,
        }),
      }
    ),
    getTasksSetByIdsOrUserIdOrSearch: build.query<
      TasksSetType,
      { tasksIds: string[]; userId: string; search: string }
    >({
      query: ({ tasksIds, userId, search }) => ({
        url: ENDPOINTS.TASKSSET,
        params: {
          ids: tasksIds.join(','),
          userId,
          search,
        },
      }),
    }),
    updateTasksSet: build.mutation<TasksSetType, TasksSetParamsType>({
      query: (newParams) => ({
        url: ENDPOINTS.TASKSSET,
        method: REQUEST_METHODS.PATCH,
        body: newParams,
      }),
    }),
    getTasksByBoardId: build.query<TasksSetType, string>({
      query: (boardId) => `${ENDPOINTS.TASKSSET}/${boardId}`,
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetTasksSetByIdsOrUserIdOrSearchQuery,
  useUpdateTasksSetMutation,
  useGetTasksByBoardIdQuery,
} = tasksApiSlice;
