import type {
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
  CommunityHomeResponseType,
} from '@/types/community';
import type { CommunityPageTextType } from '@/types/textTypes';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CommunityBoardWrapper from '../organisms/community/CommunityBoardWrapper';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';
import CommunityNoRecentBoard from '../organisms/community/CommunityNoRecentBoard';
import { getStorageRecentBoardDatas } from '@/utils/recentBoard';

export type CommunityPropTypes = {
  communityHomeData: CommunityHomeResponseType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
  texts: CommunityPageTextType;
};

type TabBarType = 'home' | 'search';

const CommunityPageTemplate = ({
  communityHomeData,
  boardCategoryData,
  boardResultData,
  texts,
}: CommunityPropTypes) => {
  const [tabBar, setTabBar] = useState<TabBarType>('home');
  const [recentlyList, setRecentlyList] = useState(communityHomeData.RESULTS.DATAS.RECENTLY_LIST);
  const searchTabState = useState<string>('전체');
  const [activeTabState] = searchTabState;

  useEffect(() => {
    const storageRecentlyList = getStorageRecentBoardDatas();
    if (!recentlyList) setRecentlyList(storageRecentlyList);
  }, []);
  const recommendList = communityHomeData.RESULTS.DATAS.RECOMMEND_LIST;
  const boardResultList = boardResultData.RESULTS.DATAS.BOARD_LIST;

  const isRecentlyListExist = !!recentlyList && recentlyList.length !== 0;

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
        maxWidth: '768px',
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
          {isRecentlyListExist ? (
            <CommunityBoardWrapper title={texts.recentlyBoards} boardList={recentlyList} />
          ) : (
            <CommunityNoRecentBoard
              title={texts.recentlyBoards}
              texts={texts.noRecentBoardTexts}
              buttonText={texts.buttonSearch}
              onClickSearch={() => setTabBar('search')}
            />
          )}
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
        color: selected ? '#ff5656' : '#999999',
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
