export const BASE_URL = 'http://localhost:3001';

export const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmMwZGJmYmNlNDU5OWU3OWU5NzYxMSIsImxvZ2luIjoiYWxleCIsImlhdCI6MTY2ODAyODIzMiwiZXhwIjoxNjY4MDcxNDMyfQ.16DnDrzldOCPuZKCifLfWJleVCGDtV8ZvljQ1EVdXxw';

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

export const RegExpPasswordValidation =
  /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z]).{8,}$/;

export const RegExpLoginValidation = /^[a-z]+([-_]?[a-z0-9]+){0,2}|[а-я]+([-_]?[а-яё0-9]+){0,2}$/i;

export const RegExpNameValidation =
  /^((?!\s{2}).)*[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']+( [^ ]+[a-zA-Zа-яА-ЯёЁ']{})\s|^((?!\s{2}).)*[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']$/;
