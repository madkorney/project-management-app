export type TaskCreateParamsType = {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
};

export type TasksUpdateParamsType = TaskCreateParamsType & {
  columnId: string;
};

export type TaskType = TasksUpdateParamsType & {
  _id: string;
  boardId: string;
  columnId: string;
};

export type TasksSetType = TaskType[];

export type TasksSetUpdateParamsType = {
  _id: string;
  order: number;
  columnId: string;
};

export type TasksSetParamsType = TasksSetUpdateParamsType[];
