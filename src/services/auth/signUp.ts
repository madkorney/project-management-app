import { UserType } from 'types';
import { BASE_URL, HttpMethodEnum, UrlEnum } from '../../constants';

export const signUp = async (name: string, login: string, password: string): Promise<UserType> =>
  await fetch(`${BASE_URL}${UrlEnum.AUTH}${UrlEnum.SIGNUP}`, {
    method: HttpMethodEnum.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((res) => res.json());
