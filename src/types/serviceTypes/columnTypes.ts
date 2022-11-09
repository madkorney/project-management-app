export type ColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ColumnParamsType = Pick<ColumnType, 'title' | 'order'>;

export type ColumnsArrayType = ColumnType[];

export type ColumnsSetParamsType = ColumnParamsType[];
