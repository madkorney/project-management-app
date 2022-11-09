export type ColumnParamsType = {
  title: string;
  order: number;
};

export type ColumnType = ColumnParamsType & {
  _id: string;
  boardId: string;
};

export type ColumnsArrayType = ColumnType[];

export type ColumnsSetParamsType = ColumnParamsType[];
