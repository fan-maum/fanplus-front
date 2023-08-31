import { CommunityMainText_KR } from '@/texts/ko';
import { CommunityHomeResponseType } from '@/types/community';
import { Dispatch, SetStateAction, useState } from 'react';
import CommunityBoardWrapper from '../organisms/CommunityBoardWrapper';

export type CommunityPropTypes = {
  communityHomeData: CommunityHomeResponseType;
};

type TabBarType = 'home' | 'search';

const CommunityPageTemplate = ({ communityHomeData }: CommunityPropTypes) => {
  const [tabBar, setTabBar] = useState<TabBarType>('home');

  const texts = CommunityMainText_KR;
  const recentlyList = communityHomeData.RESULTS.DATAS.RECENTLY_LIST;
  const recommendList = communityHomeData.RESULTS.DATAS.RECOMMEND_LIST;

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '400px',
        margin: '0px auto',
      }}
    >
      {/** TODO: 커뮤니티 대신 string 작업 해야함 */}
      <h3 css={{ margin: '5px' }}>{texts.community}</h3>
      <TabBar
        tabTitles={{ home: texts.home, search: texts.search }}
        tabBar={tabBar}
        setTabBar={setTabBar}
      />
      {tabBar === 'home' ? (
        <>
          <CommunityBoardWrapper title={texts.recentlyBoards} boardList={recentlyList} />
          <CommunityBoardWrapper title={texts.recommendedBoards} boardList={recommendList} />
        </>
      ) : null}
    </div>
  );
};

export default CommunityPageTemplate;

type TabBarPropTypes = {
  tabTitles: {
    home: string;
    search: string;
  };
  tabBar: TabBarType;
  setTabBar: Dispatch<SetStateAction<TabBarType>>;
};

const TabBar = ({ tabTitles, tabBar, setTabBar }: TabBarPropTypes) => {
  const handleClick = (tabBar: TabBarType) => setTabBar(tabBar);
  return (
    <ul css={{ width: '100%', display: 'flex', margin: '8px 0px' }}>
      <TabBarItem
        title={tabTitles.home}
        selected={tabBar === 'home'}
        onClick={() => handleClick('home')}
      />
      <TabBarItem
        title={tabTitles.search}
        selected={tabBar === 'search'}
        onClick={() => handleClick('search')}
      />
    </ul>
  );
};

const TabBarItem = ({
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
        fontSize: '15px',
        fontWeight: '600',
        color: selected ? '#ff5656' : '#000',
        borderBottom: `2.5px solid ${selected ? '#ff5656' : '#d9d9d9'}`,
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {title}
    </li>
  );
};
