export * from './boards';

export * from './columns';

export * from './files';

export * from './points';

export * from './tasks';

export * from './users';

type ErrorMessage = {
  statusCode: number;
  message: string;
};

export type ErrorResponse = {
  status: number;
  data: ErrorMessage;
};
