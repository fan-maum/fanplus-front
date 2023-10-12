import type {
  BoardListItemType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
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
import { useRouter } from 'next/router';

export type CommunityHomeDataType = {
  recommendList: BoardListItemType[];
  recentlyList: BoardListItemType[];
};

export type CommunityPropTypes = {
  communityHomeData: CommunityHomeDataType;
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
  const router = useRouter();

  const [tabBar, setTabBar] = useState((router.query.tab as TabBarType) || 'home');
  const [recentlyList, setRecentlyList] = useState(communityHomeData.recentlyList);
  const searchTabState = useState(texts.allCategory);
  const [activeTabState] = searchTabState;

  useEffect(() => {
    const storageRecentlyList = getStorageRecentBoardDatas();
    if (recentlyList.length === 0) setRecentlyList(storageRecentlyList);
  }, []);
  const recommendList = communityHomeData.recommendList;
  const boardResultTotalCount = boardResultData.RESULTS.DATAS.TOTAL_COUNT;
  const boardResultList = boardResultData.RESULTS.DATAS.BOARD_LIST;

  const isRecentlyListExist = !!recentlyList && recentlyList.length !== 0;

  /**
   * searchCategoryTab : IDX - NAME
   * 0 - 전체 / 1 - 남자 가수 / 2 - 여자 가수 / 3 - 남자 배우 / 4 - 여자 배우 / 5 - 자유게시판
   */
  const searchCategoryTabDtos = boardCategoryData.RESULTS.DATAS.CATEGORY_LIST;
  const seearchAllCategory = { CATEGORY_IDX: 0, CATEGORY_NAME: texts.allCategory };
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
        texts={texts}
        setTabBar={setTabBar}
        searchTabState={searchTabState}
      />
      {tabBar === 'home' ? (
        <>
          {isRecentlyListExist ? (
            <CommunityBoardWrapper
              title={texts.recentlyBoards}
              boardList={recentlyList}
              postCountText={texts.postCount}
            />
          ) : (
            <CommunityNoRecentBoard
              title={texts.recentlyBoards}
              texts={texts.noRecentBoardTexts}
              buttonText={texts.buttonSearch}
              onClickSearch={() => {
                setTabBar('search');
                router.push({ pathname: router.pathname, query: { tab: 'search' } });
              }}
            />
          )}
          <CommunityBoardWrapper
            title={texts.recommendedBoards}
            boardList={recommendList}
            postCountText={texts.postCount}
          />
        </>
      ) : (
        <>
          <CommunityBoardSearchInputWrapper searchTabState={searchTabState} texts={texts} />
          <CommunityBoardFilterTab
            searchCategoryTabs={searchCategoryTabs}
            searchTabState={searchTabState}
          />
          <CommunitySearchBoardWrapper
            boardList={boardResultList}
            activeTabState={activeTabState}
            texts={texts}
          />
          {boardResultList.length !== 0 && (
            <CommunitySearchBoardPagination totalCount={boardResultTotalCount} itemsPerPage={20} />
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
  texts: CommunityPageTextType;
  setTabBar: Dispatch<SetStateAction<TabBarType>>;
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

const TabBar = ({
  tabTitles,
  tabBar,
  texts,
  setTabBar,
  searchTabState: [activeTab, setActiveTab],
}: TabBarPropTypes) => {
  const router = useRouter();
  const handleClick = (tabBar: TabBarType) => {
    setTabBar(tabBar);
    router.push({ pathname: router.pathname, query: { tab: tabBar } });
  };
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
        onClick={() => {
          handleClick('search');
          setActiveTab(texts.allCategory);
          router.push({
            pathname: router.pathname,
            query: {
              category_type: 0,
              searchValue: '',
              page: 0,
              tab: 'search',
            },
          });
        }}
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
