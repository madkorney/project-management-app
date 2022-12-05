export const BASE_URL = 'https://final-task-backend-production-87eb.up.railway.app';

export enum STATUS_CODES {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export enum ENDPOINTS {
  AUTH = '/auth',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
  USERS = '/users',
  BOARDS = '/boards',
  BOARDSSET = '/boardsSet',
  COLUMNS = '/columns',
  COLUMNSSET = '/columnsSet',
  TASKS = '/tasks',
  TASKSSET = '/tasksSet',
  FILE = '/file',
  POINTS = '/points',
}

export enum REQUEST_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export const { REACT_APP_BASENAME } = process.env;
