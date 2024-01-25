import { CommunityPageTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

export type TabBarPropTypes = {
  tabTitles: {
    firstTab: string;
    secondTab: string;
  };
  tabBar: string;
  tabItems: [string, string];
  texts: CommunityPageTextType;
  setTabBar: Dispatch<SetStateAction<string>>;
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

export const TabBar = ({
  tabTitles,
  tabBar,
  tabItems,
  texts,
  setTabBar,
  searchTabState: [activeTab, setActiveTab],
}: TabBarPropTypes) => {
  const router = useRouter();
  return (
    <ul css={{ width: '100%', display: 'flex', marginTop: '20px' }}>
      <TabBarItem
        title={tabTitles.firstTab}
        selected={tabBar === tabItems[0]}
        onClick={() => {
          setActiveTab(texts.boardMain);
          setTabBar(tabItems[0]);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              boardType: tabItems[0],
              locale: router.query.locale,
              page: 1,
            },
          });
        }}
      />
      <TabBarItem
        title={tabTitles.secondTab}
        selected={tabBar === tabItems[1]}
        onClick={() => {
          setActiveTab(texts.bestPopular);
          setTabBar(tabItems[1]);
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              boardType: tabItems[1],
              locale: router.query.locale,
              page: 1,
            },
          });
        }}
      />
    </ul>
  );
};

export const TabBarItem = ({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <li
      css={{
        width: '50%',
        height: '40px',
        lineHeight: '37px',
        fontSize: '14px',
        fontWeight: '600',
        color: selected ? '#ff5656' : '#999999',
        borderBottom: `2.5px solid ${selected ? '#ff5656' : '#d9d9d9'}`,
        textAlign: 'center',
        cursor: 'pointer',
        wordBreak: 'break-word',
        whiteSpace: 'nowrap',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
