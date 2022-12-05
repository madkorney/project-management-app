export type UserFullInfoType = {
  _id: string;
  name: string;
  login: string;
  password: string;
};

export type AuthInfoType = Pick<UserFullInfoType, 'login' | 'password'>;

export type AuthSuccessfulType = {
  token: string;
};

export type UserSignUpType = Omit<UserFullInfoType, '_id'>;

export type UserType = Omit<UserFullInfoType, 'password'>;

export type UsersArrayType = UserType[];
