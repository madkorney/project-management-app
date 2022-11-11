export type TaskType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export type TaskCreateParamsType = Omit<TaskType, '_id' | 'boardId' | 'columnId'>;

export type TaskUpdateParamsType = Omit<TaskType, '_id' | 'boardId'>;

export type TasksSetType = TaskType[];

export type TasksSetUpdateParamsType = Pick<TaskType, '_id' | 'order' | 'columnId'>;

export type TasksSetParamsType = TasksSetUpdateParamsType[];
