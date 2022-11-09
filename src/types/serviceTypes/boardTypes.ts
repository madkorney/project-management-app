export type BoardParamsType = {
  title: string;
  owner: string;
  users: string[];
};

export type BoardType = BoardParamsType & {
  _id: string;
};

export type BoardsArrayType = BoardType[];
