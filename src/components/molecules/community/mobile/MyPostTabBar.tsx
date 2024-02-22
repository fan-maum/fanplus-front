import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TabBarItem } from './TabBar';

export type TabBarPropTypes = {
  tabTitles: {
    firstTab: string;
    secondTab: string;
  };
  tabBar: string;
  tabItems: [string, string];
  setTabBar: Dispatch<SetStateAction<string>>;
};

export const MyPostTabBar = ({ tabTitles, tabBar, tabItems, setTabBar }: TabBarPropTypes) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.boardType === tabItems[0] || router.query.boardType === undefined)
      setTabBar(tabItems[0]);
    if (router.query.boardType === tabItems[1]) setTabBar(tabItems[1]);
  }, [router.query.boardType, setTabBar]);

  return (
    <ul css={{ width: '100%', display: 'none', '@media(max-width:768px)': { display: 'flex' } }}>
      <TabBarItem
        title={tabTitles.firstTab}
        selected={tabBar === tabItems[0]}
        onClick={() => {
          setTabBar(tabItems[0]);
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                boardType: tabItems[0],
                locale: router.query.locale,
                page: 1,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      />
      <TabBarItem
        title={tabTitles.secondTab}
        selected={tabBar === tabItems[1]}
        onClick={() => {
          setTabBar(tabItems[1]);
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                boardType: tabItems[1],
                locale: router.query.locale,
                page: 1,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
      />
    </ul>
  );
};
