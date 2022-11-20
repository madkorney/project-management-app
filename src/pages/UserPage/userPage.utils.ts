import { UserSignUpType } from 'types';

export const updateProfile = (id: string, userData: UserSignUpType) => {
  return {
    _id: id,
    name: userData.name,
    login: userData.login,
    password: userData.password,
  };
};
