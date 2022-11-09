import { BASE_URL, UrlEnum, HttpMethodEnum, TEST_TOKEN } from '../../constants';
import { UsersArrayType, UserType } from 'types';

export const getUsers = async (id?: string): Promise<UserType | UsersArrayType> =>
  await fetch(`${BASE_URL}${UrlEnum.USERS}${id}`, {
    method: HttpMethodEnum.GET,
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
