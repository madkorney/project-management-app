export type AuthInfoType = {
  login: string;
  password: string;
};

export type AuthSuccessfulType = {
  token: string;
};

export type UserSignUpType = AuthInfoType & {
  name: string;
};

export type UserType = {
  _id: string;
  name: string;
  login: string;
};

export type UsersArrayType = UserType[];
