import { AuthSuccessfulType } from 'types';
import { BASE_URL, HttpMethodEnum, UrlEnum } from '../../constants';

export const signIn = async (login: string, password: string): Promise<AuthSuccessfulType> =>
  await fetch(`${BASE_URL}${UrlEnum.AUTH}${UrlEnum.SIGNIN}`, {
    method: HttpMethodEnum.POST,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((res) => res.json());
