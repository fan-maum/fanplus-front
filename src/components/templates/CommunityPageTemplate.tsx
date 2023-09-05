import { CommunityMainText_KR } from '@/texts/ko';
import {
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
  CommunityHomeResponseType,
} from '@/types/community';
import { Dispatch, SetStateAction, useState } from 'react';
import CommunityBoardWrapper from '../organisms/community/CommunityBoardWrapper';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';

export type CommunityPropTypes = {
  communityHomeData: CommunityHomeResponseType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
};

type TabBarType = 'home' | 'search';

const CommunityPageTemplate = ({
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPropTypes) => {
  const [tabBar, setTabBar] = useState<TabBarType>('search');
  const searchTabState = useState<string>('전체');
  const [activeTabState] = searchTabState;

  const texts = CommunityMainText_KR;
  const recentlyList = communityHomeData.RESULTS.DATAS.RECENTLY_LIST;
  const recommendList = communityHomeData.RESULTS.DATAS.RECOMMEND_LIST;
  const boardResultList = boardResultData.RESULTS.DATAS.BOARD_LIST;

  /**
   * searchCategoryTab : IDX - NAME
   * 0 - 전체 / 1 - 남자 가수 / 2 - 여자 가수 / 3 - 남자 배우 / 4 - 여자 배우 / 5 - 자유게시판
   */
  const searchCategoryTabDtos = boardCategoryData.RESULTS.DATAS.CATEGORY_LIST;
  const seearchAllCategory = { CATEGORY_IDX: 0, CATEGORY_NAME: '전체' };
  const searchCategoryTabs = [seearchAllCategory, ...searchCategoryTabDtos];

  return (
    <div
      css={{
        width: '100%',
        maxWidth: '400px',
        margin: '0px auto',
      }}
    >
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
      ) : (
        <>
          <CommunityBoardSearchInputWrapper searchTabState={searchTabState} />
          <CommunityBoardFilterTab
            searchCategoryTabs={searchCategoryTabs}
            searchTabState={searchTabState}
          />
          <CommunitySearchBoardWrapper
            boardList={boardResultList}
            activeTabState={activeTabState}
          />
          {boardResultList.length !== 0 && (
            <CommunitySearchBoardPagination totalCount={boardResultList.length} itemsPerPage={20} />
          )}
        </>
      )}
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
