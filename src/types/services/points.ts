export type PointType = {
  _id: string;
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
};

export type PointParamsType = Omit<PointType, '_id'>;

export type PointsListType = PointType[];

export type PointsSetUpdateParamsType = Pick<PointType, '_id' | 'done'>[];

export type PointUpdateParamsType = Pick<PointType, '_id' | 'title' | 'done'>;
