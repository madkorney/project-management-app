export type BoardType = {
  _id: string;
  title: string;
  description: string;
  owner: string;
  users: string[];
};

export type BoardParamsType = Omit<BoardType, '_id'>;

export type BoardsArrayType = BoardType[];
