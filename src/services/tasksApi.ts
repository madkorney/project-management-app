import { baseApiSlice } from './baseApi';
import { TaskType, TasksSetType, TasksSetParamsType } from 'types';
import { REQUEST_METHODS, ENDPOINTS } from 'data/constants';

export const tasksApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksSetType, Pick<TaskType, 'boardId' | 'columnId'>>({
      query: ({ boardId, columnId }) =>
        `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}`,
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Tasks' as const, _id })), 'Tasks']
          : ['Tasks'],
    }),
    createTask: build.mutation<TaskType, Omit<TaskType, '_id'>>({
      query: ({ boardId, columnId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}`,
        method: REQUEST_METHODS.POST,
        body: newParams,
      }),
      invalidatesTags: ['Tasks'],
    }),
    getTaskById: build.query<TaskType, Pick<TaskType, '_id' | 'boardId' | 'columnId'>>({
      query: ({ boardId, columnId, _id: taskId }) =>
        `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}/${taskId}`,
    }),
    updateTaskById: build.mutation<TaskType, TaskType>({
      query: ({ boardId, columnId, _id: taskId, ...newParams }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}/${taskId}`,
        method: REQUEST_METHODS.PUT,
        body: { columnId, ...newParams },
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTaskById: build.mutation<TaskType, Pick<TaskType, '_id' | 'boardId' | 'columnId'>>({
      query: ({ boardId, columnId, _id: taskId }) => ({
        url: `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}/${taskId}`,
        method: REQUEST_METHODS.DELETE,
      }),
      invalidatesTags: ['Tasks'],
    }),
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
  useLazyGetTasksQuery,
  useCreateTaskMutation,
  useGetTaskByIdQuery,
  useUpdateTaskByIdMutation,
  useDeleteTaskByIdMutation,
  useGetTasksSetByIdsOrUserIdOrSearchQuery,
  useUpdateTasksSetMutation,
  useGetTasksByBoardIdQuery,
} = tasksApiSlice;
