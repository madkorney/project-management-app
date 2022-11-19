import { UpdateUser } from 'redux/modalUserSlice';

export const updateProfile = (id: string, userData: UpdateUser) => {
  return {
    _id: id,
    name: userData.name,
    login: userData.login,
    password: userData.password,
  };
};
