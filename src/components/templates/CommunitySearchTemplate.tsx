import { SearchPageProps } from '@/pages/[locale]/community/search';
import CommunityBoardFilterTab from '../organisms/community/CommunityBoardFilterTab';
import { BoardItemListSkeleton } from '../molecules/community/CommunitySkeleton';
import CommunitySearchBoardWrapper from '../organisms/community/CommunitySearchBoardWrapper';
import CommunitySearchBoardPagination from '../organisms/community/CommunitySearchBoardPagination';
import { getCommunityBoardResultData } from '@/api/Community';
import { useQuery } from 'react-query';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { useRouter } from 'next/router';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import { useState } from 'react';

const CommunitySearchTemplate = ({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
}: SearchPageProps) => {
  const router = useRouter();
  const texts = communityMainPageTexts[urlLang];
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(router.query.category_type as string) || 0;
  const searchValue = router.query.searchValue || '';
  const page = parseInt(router.query.page as string) - 1 || 0;

  const searchTabState = useState(texts.allCategory);
  const [activeTabState] = searchTabState;

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
    <div>
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
    </div>
  );
};

export default CommunitySearchTemplate;
