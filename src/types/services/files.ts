export type FileType = {
  _id: string;
  name: string;
  taskId: string;
  boardId: string;
  path: string;
};

export type FileListType = FileType[];
