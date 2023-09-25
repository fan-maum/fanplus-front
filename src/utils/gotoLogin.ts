import { NextRouter } from 'next/router';

export const gotoLogin = (router: NextRouter, newQueries?: Record<string, any>) => {
  const nextPath = router.asPath.split('?')[0];
  const nextQuery = setNextQuery(router, newQueries);

  router.push({ pathname: '/login/', query: { nextUrl: nextPath + nextQuery } });
};

const setNextQuery = (router: NextRouter, newQueries?: Record<string, any>) => {
  const query = { ...router.query };
  for (const key in newQueries) query[key] = newQueries[key];

  let nextQuery = '?';
  for (const key in query) nextQuery += key + '=' + query[key] + ';';
  return nextQuery.slice(0, nextQuery.length - 1);
};
