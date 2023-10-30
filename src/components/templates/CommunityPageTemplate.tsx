import { getCommunityBoardResultData } from '@/api/Community';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { CommunityPropTypes } from '@/pages/[locale]/community';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import type { CommunityPageTextType } from '@/types/textTypes';
import { getStorageRecentBoardDatas } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useQuery } from 'react-query';
import { BoardItemListSkeleton } from '../molecules/community/CommunitySkeleton';
import PopularBoardsMobile from '../molecules/community/PopularBoardsMobile';
import CommunityBoardWrapper from '../organisms/community/CommunityBoardWrapper';
import CommunityNoRecentBoard from '../organisms/community/CommunityNoRecentBoard';
import CommunityLayout from './CommunityLayout';

type TabBarType = 'home' | 'search';

const CommunityPageTemplate = ({
  urlLang,
  communityHomeData,
  boardCategoryData,
  boardResultData,
  initialProps,
}: CommunityPropTypes) => {
  const router = useRouter();
  const texts = communityMainPageTexts[urlLang];
  const [tabBar, setTabBar] = useState((router.query.tab as TabBarType) || 'home');
  const [recentlyList, setRecentlyList] = useState(communityHomeData.recentlyList);
  const searchTabState = useState(texts.allCategory);
  const [activeTabState] = searchTabState;

  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(router.query.category_type as string) || 0;
  const searchValue = router.query.searchValue || '';
  const page = parseInt(router.query.page as string) - 1 || 0;

  const isInitialProps =
    initialProps.category_type === category_type &&
    initialProps.searchValue === searchValue &&
    initialProps.serverLang === serverLang &&
    initialProps.page === page;

  const { data: boardResultClientData, isFetching } = useQuery(
    ['boardResults', { category_type, searchValue, serverLang, page }],
    () => getCommunityBoardResultData(category_type, searchValue, serverLang, page, 20),
    { initialData: isInitialProps ? boardResultData : undefined }
  );

  useEffect(() => {
    const storageRecentlyList = getStorageRecentBoardDatas();
    if (recentlyList.length === 0) setRecentlyList(storageRecentlyList);
  }, []);

  const recommendList = communityHomeData.recommendList;
  const boardResultTotalCount = boardResultClientData?.RESULTS.DATAS.TOTAL_COUNT;
  const boardResultList = boardResultClientData?.RESULTS.DATAS.BOARD_LIST;

  const isRecentlyListExist = !!recentlyList && recentlyList.length !== 0;

  /**
   * searchCategoryTab : IDX - NAME
   * 0 - 전체 / 1 - 남자 가수 / 2 - 여자 가수 / 3 - 남자 배우 / 4 - 여자 배우 / 5 - 자유게시판
   */
  const searchCategoryTabDtos = boardCategoryData.RESULTS.DATAS.CATEGORY_LIST;
  const seearchAllCategory = { CATEGORY_IDX: 0, CATEGORY_NAME: texts.allCategory };
  const searchCategoryTabs = [seearchAllCategory, ...searchCategoryTabDtos];

  return (
    <CommunityLayout>
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
            {isMobile && <PopularBoardsMobile texts={communityLayoutTexts[urlLang]} />}
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
                  router.push({
                    pathname: router.pathname,
                    query: { tab: 'search', locale: router.query.locale },
                  });
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
            {isFetching ? (
              <section css={{ marginBottom: '30px' }}>
                <BoardItemListSkeleton />
              </section>
            ) : (
              <CommunitySearchBoardWrapper
                boardList={boardResultList}
                activeTabState={activeTabState}
                texts={texts}
              />
            )}
            {boardResultList?.length !== 0 && (
              <CommunitySearchBoardPagination
                totalCount={boardResultTotalCount as number}
                itemsPerPage={20}
              />
            )}
          </>
        )}
      </div>
    </CommunityLayout>
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
    router.push({ pathname: router.pathname, query: { tab: tabBar, locale: router.query.locale } });
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
          setActiveTab(texts.allCategory);
          setTabBar('search');
          router.push({
            pathname: router.pathname,
            query: {
              category_type: 0,
              searchValue: '',
              page: 0,
              tab: 'search',
              locale: router.query.locale,
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
