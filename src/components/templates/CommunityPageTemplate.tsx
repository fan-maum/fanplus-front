import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import type { CommunityHomeDataType } from '@/pages/[locale]/community';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import type { CommunityPageTextType } from '@/types/textTypes';
import { getStorageRecentBoardDatas } from '@/utils/localStorage';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CommunityBoardWrapper from '../organisms/community/CommunityBoardWrapper';
import CommunityNoRecentBoard from '../organisms/community/CommunityNoRecentBoard';
import { UrlLangType } from '@/types/common';
import {
  BoardResultItemType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import { useGetBoardResultQueryProps } from '@/server/useGetCommentsQuery';
import { useQuery } from 'react-query';
import { getBoardResultQuery } from '@/server/query';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { Skeleton } from '@mantine/core';

type TabBarType = 'home' | 'search';

export type CommunityPagePropTypes = {
  urlLang: UrlLangType;
  communityHomeData: CommunityHomeDataType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
};

const CommunityPageTemplate = ({
  urlLang,
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPagePropTypes) => {
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

  const useGetBoardResultQueryProps: useGetBoardResultQueryProps = {
    category_type,
    searchValue,
    serverLang,
    page,
    per_page: 20,
  };

  const {
    data: boardResultClientData,
    isFetching,
    refetch: refetchBoardResultData,
  } = useQuery({
    queryKey: ['boardResults', useGetBoardResultQueryProps],
    queryFn: () => getBoardResultQuery(useGetBoardResultQueryProps),
    initialData: boardResultData,
  });

  useEffect(() => {
    const storageRecentlyList = getStorageRecentBoardDatas();
    if (recentlyList.length === 0) setRecentlyList(storageRecentlyList);
  }, []);
  const recommendList = communityHomeData.recommendList;
  const boardResultTotalCount = boardResultClientData.RESULTS.DATAS.TOTAL_COUNT;
  const boardResultList = boardResultClientData.RESULTS.DATAS.BOARD_LIST;

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
          <CommunityBoardSearchInputWrapper
            searchTabState={searchTabState}
            texts={texts}
            refetchBoardResultData={refetchBoardResultData}
          />
          <CommunityBoardFilterTab
            searchCategoryTabs={searchCategoryTabs}
            searchTabState={searchTabState}
            refetchBoardResultData={refetchBoardResultData}
          />
          {isFetching ? (
            <section css={{ marginBottom: '30px' }}>
              {boardResultList.map((boardItem: BoardResultItemType) => {
                return (
                  <div
                    key={boardItem.BOARD_IDX}
                    css={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottom: '1px solid #d9d9d9',
                      margin: '5px 0px',
                      padding: '5px 5px 10px',
                    }}
                  >
                    <Skeleton width={64} height={84} mx={10} radius="sm" />
                    <div css={{ display: 'flex', flexDirection: 'column' }}>
                      <Skeleton width={160} height={10} radius="xl" />
                      <Skeleton width={120} height={10} mt={10} radius="xl" />
                    </div>
                  </div>
                );
              })}
            </section>
          ) : (
            <CommunitySearchBoardWrapper
              boardList={boardResultList}
              activeTabState={activeTabState}
              texts={texts}
            />
          )}

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
