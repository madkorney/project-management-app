export type PointParamsType = {
  title: string;
  taskId: string;
  boardId: string;
  done: boolean;
};

export type PointType = PointParamsType & {
  _id: string;
};

export type PointsListType = PointType[];

export type PointsSetUpdateParamsType = {
  _id: string;
  done: boolean;
}[];

export type PointUpdateParamsType = {
  title: string;
  done: string;
};
