import { PostQueryType } from '../@types';

export function makeQueryString(query: PostQueryType) {
  return Object.entries(query)
    .map((item) => `${item[0]}=${item[1]}`)
    .join('&');
}