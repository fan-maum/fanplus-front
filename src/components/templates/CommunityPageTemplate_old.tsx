import { getCommunityBoardResultData } from '@/api/Community';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunityBoardSearchInputWrapper from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
import CommunitySearchBoardPagination from '@/components/organisms/community/CommunitySearchBoardPagination';
import CommunitySearchBoardWrapper from '@/components/organisms/community/CommunitySearchBoardWrapper';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { CommunityPropTypes } from '@/pages/[locale]/community';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import type { CommunityPageTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';
import { BoardItemListSkeleton } from '../molecules/community/CommunitySkeleton';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import CommunityLayout from './CommunityLayout';
import CommunityBoardArticleTable from '../organisms/community/CommunityBoardArticleTable';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import PopularBoardsMobile from '../molecules/community/PopularBoardsMobile';

type TabBarType = 'boards' | 'bestPopular';

const CommunityPageTemplate = ({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
  userId,
  boardIndex,
  boardLangCookie,
  communityBoardData,
  initialBestBoardProps,
}: CommunityPropTypes) => {
  const router = useRouter();
  const texts = communityMainPageTexts[urlLang];
  const bestBoardtexts = communityBoardTexts[urlLang];
  const [tabBar, setTabBar] = useState((router.query.tab as TabBarType) || 'boards');
  const searchTabState = useState(texts.allCategory);
  const [activeTabState] = searchTabState;

  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(router.query.category_type as string) || 0;
  const searchValue = router.query.searchValue || '';
  const page = parseInt(router.query.page as string) - 1 || 0;
  const topicIndex = Number(router.query.topic) || 0;
  const viewType = (router.query.view as string) || 'all';

  const isInitialProps =
    initialProps.category_type === category_type &&
    initialProps.searchValue === searchValue &&
    initialProps.serverLang === serverLang &&
    initialProps.page === page;

  const isInitialBestBoardProps =
    initialBestBoardProps.boardLangCookie === boardLangCookie &&
    initialBestBoardProps.page === page &&
    initialBestBoardProps.serverLang === serverLang &&
    initialBestBoardProps.view_type === viewType &&
    initialBestBoardProps.topic === topicIndex;

  const { data: boardResultClientData, isFetching } = useQuery(
    ['boardResults', { category_type, searchValue, serverLang, page }],
    () => getCommunityBoardResultData(category_type, searchValue, serverLang, page, 20),
    { initialData: isInitialProps ? boardResultData : undefined }
  );

  const boardResultTotalCount = boardResultClientData?.RESULTS.DATAS.TOTAL_COUNT;
  const boardResultList = boardResultClientData?.RESULTS.DATAS.BOARD_LIST;

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
          maxWidth: '728px',
          margin: '0px auto',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            margin: '6px 0 20px',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              padding: '0 16px',
            },
          }}
        >
          <h3 css={{ margin: '5px' }}>{texts.community}</h3>
          {/* <CommunityBoardSearchInputWrapper
            setTabBar={setTabBar}
            searchTabState={searchTabState}
            texts={texts}
          /> */}
        </div>
        <PopularBoardsMobile texts={communityLayoutTexts[urlLang]} initialOpen={false} />
        <TabBar
          tabTitles={{ boards: texts.boards, bestPopular: texts.bestPopular }}
          tabBar={tabBar}
          texts={texts}
          setTabBar={setTabBar}
          searchTabState={searchTabState}
        />
        {tabBar === 'boards' ? (
          <>
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
        ) : (
          <div css={{ '& > div': { padding: 0 } }}>
            <CommunityBoardArticleTable
              communityBoardDataSSR={communityBoardData}
              texts={bestBoardtexts}
              queries={{
                userId,
                boardIndex,
                page,
                requestLang: serverLang,
                boardLang: boardLangCookie,
                topicIndex,
                viewType,
              }}
              isInitialData={isInitialBestBoardProps}
              onClickWrite={() => {
                return false;
              }}
            />
          </div>
        )}
      </div>
    </CommunityLayout>
  );
};

export default CommunityPageTemplate;

type TabBarPropTypes = {
  tabTitles: {
    boards: string;
    bestPopular: string;
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

  return (
    <ul css={{ width: '100%', display: 'flex', margin: '8px 0px' }}>
      <TabBarItem
        title={tabTitles.boards}
        selected={tabBar === 'boards'}
        onClick={() => {
          setActiveTab(texts.allCategory);
          setTabBar('boards');
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              category_type: 0,
              page: 0,
              tab: 'boards',
              locale: router.query.locale,
            },
          });
        }}
      />
      <TabBarItem
        title={tabTitles.bestPopular}
        selected={tabBar === 'bestPopular'}
        onClick={() => {
          setTabBar('bestPopular');
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              tab: 'bestPopular',
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
