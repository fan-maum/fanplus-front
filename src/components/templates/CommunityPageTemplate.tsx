import { getCommunityBoardResultData } from '@/api/Community';
import CommunityBoardFilterTab from '@/components/organisms/community/CommunityBoardFilterTab';
import CommunityBoardSearchInputWrapper, {
  FormValue,
} from '@/components/organisms/community/CommunityBoardSearchInputWrapper';
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
import CommunityNoRecentBoard from '../organisms/community/CommunityNoRecentBoard';
import CommunityLayout from './CommunityLayout';
import { UseFormSetValue, useForm } from 'react-hook-form';

type TabBarType = 'boards' | 'bestPopular';

const CommunityPageTemplate = ({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
}: CommunityPropTypes) => {
  const router = useRouter();
  const texts = communityMainPageTexts[urlLang];
  const [tabBar, setTabBar] = useState((router.query.tab as TabBarType) || 'boards');
  const searchTabState = useState(texts.allCategory);
  const [activeTabState] = searchTabState;
  const [inputValue, setInputValue] = useState('');
  const { setValue } = useForm<FormValue>();

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
    () => getCommunityBoardResultData(category_type, searchValue, serverLang, page, 6),
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
          maxWidth: '768px',
          margin: '0px auto',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '40px',
            margin: '6px 0 20px',
          }}
        >
          <h3 css={{ margin: '5px' }}>{texts.community}</h3>
          <CommunityBoardSearchInputWrapper
            setTabBar={setTabBar}
            searchTabState={searchTabState}
            inputValue={inputValue}
            setInputValue={setInputValue}
            texts={texts}
          />
        </div>
        <TabBar
          tabTitles={{ boards: texts.boards, bestPopular: texts.bestPopular }}
          tabBar={tabBar}
          texts={texts}
          setTabBar={setTabBar}
          searchTabState={searchTabState}
          setInputValue={setInputValue}
          setValue={setValue}
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
          <>
            <CommunityNoRecentBoard
              title={texts.recentlyBoards}
              texts={texts.noRecentBoardTexts}
              buttonText={texts.buttonSearch}
              onClickSearch={() => {
                setTabBar('bestPopular');
                router.push({
                  pathname: router.pathname,
                  query: { tab: 'bestPopular', locale: router.query.locale },
                });
              }}
            />
          </>
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
  setInputValue: React.Dispatch<React.SetStateAction<any>>;
  setValue: UseFormSetValue<FormValue>;
};

const TabBar = ({
  tabTitles,
  tabBar,
  texts,
  setTabBar,
  searchTabState: [activeTab, setActiveTab],
  setInputValue,
  setValue,
}: TabBarPropTypes) => {
  const router = useRouter();
  const handleClick = (tabBar: TabBarType) => {
    setTabBar(tabBar);
    router.push({ pathname: router.pathname, query: { tab: tabBar, locale: router.query.locale } });
  };

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
              category_type: 0,
              searchValue: '',
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
          handleClick('bestPopular');
          setInputValue('');
          setValue('searchValue', '');
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
