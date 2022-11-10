export type ColumnType = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type ColumnUpdateParamsType = Pick<ColumnType, 'title' | 'order'>;

export type ColumnCreateParamsType = Omit<ColumnType, '_id'>;

export type ColumnsArrayType = ColumnType[];

export type ColumnsSetUpdateParamsType = ColumnUpdateParamsType[];

export type ColumnsSetCreateParamsType = ColumnCreateParamsType[];
