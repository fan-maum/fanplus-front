import { getCommunityBoardData } from '@/api/Community';
import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';

type BoardArticleTableProps = {
  communityBoardDataSSR: CommunityBoardResponseType;
  texts: CommunityBoardTextType;
  queries: {
    userId: string;
    boardIndex: number;
    page: number;
    requestLang: ServerLangType;
    boardLang: BoardLangType;
    topicIndex: number;
    viewType: string;
  };
  isInitialData: boolean;
  onClickWrite: () => void;
};

const CommunityBoardArticleTable = ({
  communityBoardDataSSR,
  texts,
  queries,
  isInitialData,
  onClickWrite,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType } = queries;

  const { data: communityBoardData, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType },
    ],
    () =>
      getCommunityBoardData(userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType),
    { initialData: isInitialData ? communityBoardDataSSR : undefined }
  );

  const handlePageChange = async (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } }, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const postList = communityBoardData?.RESULTS.DATAS.POST_LIST;
  const boardInfo = communityBoardData?.RESULTS.DATAS.BOARD_INFO;

  const isPostExist = !(
    postList?.length === 0 &&
    (!router.query.page || router.query.page === '1')
  );

  return isFetching ? (
    <CommunityBoardArticleTableSkeleton />
  ) : isPostExist ? (
    <div css={{ padding: '0 20px', '@media(max-width: 768px)': { padding: 0 } }}>
      <CommunityBoardArticleTableHeader />
      <ul>
        {postList?.map((post, idx) => {
          return (
            <>
              <CommunityBoardArticle
                key={'CommunityBoardArticle' + idx}
                postItem={post}
                link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
              />
              <CommunityBoardArticleMobile
                key={'CommunityBoardArticleMobile' + idx}
                postItem={post}
                link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                texts={texts}
              />
            </>
          );
        })}
      </ul>
      <CommunityBoardPagination
        totalCount={boardInfo?.POST_CNT as number}
        handlePageChange={handlePageChange}
      />
    </div>
  ) : (
    <CommunityBoardNoPost
      onClickWrite={onClickWrite}
      buttonText={texts.buttonWrite}
      texts={texts.noPostTexts}
    />
  );
};

export default CommunityBoardArticleTable;
