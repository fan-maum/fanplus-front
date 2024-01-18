import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
<<<<<<< HEAD
=======
import type { BoardLangType, ServerLangType } from '@/types/common';
>>>>>>> master
import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';

type BoardArticleTableProps = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardDataSSR: CommunityBoardResponseType;
  isFetching: boolean;
  texts: CommunityBoardTextType;
<<<<<<< HEAD
  isStarBoardTableHeader?: boolean;
=======
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
>>>>>>> master
  onClickWrite: () => void;
};

const CommunityBoardArticleTable = ({
  communityBoardData,
  communityBoardDataSSR,
  isFetching,
  texts,
<<<<<<< HEAD
  isStarBoardTableHeader,
=======
  queries,
  isInitialData,
>>>>>>> master
  onClickWrite,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
<<<<<<< HEAD
  const { boardIndex: urlBoardIndex } = router.query;
  const isBestBoard = urlBoardIndex === '2291' || router.query.boardType === '2291';
  const currentBoardIndex = isBestBoard ? 2291 : Number(router.query.boardIndex);

  const tableHeader = isStarBoardTableHeader || isBestBoard ? 'board' : 'topic';
=======
  const { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType } = queries;
  const isBestBoard = boardIndex === 2291 ? 'board' : 'topic';

  const { data: communityBoardData, isFetching } = useQuery(
    [
      'communityBoardData',
      { userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType },
    ],
    () =>
      getCommunityBoardData(userId, boardIndex, page, requestLang, boardLang, topicIndex, viewType),
    { initialData: isInitialData ? communityBoardDataSSR : undefined }
  );
>>>>>>> master

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

  if (isFetching) return <CommunityBoardArticleTableSkeleton firstHeader={isBestBoard} />;
  if (!isPostExist) {
    return (
      <CommunityBoardNoPost
        onClickWrite={onClickWrite}
        buttonText={texts.buttonWrite}
        texts={texts.noPostTexts}
      />
    );
  }
  return (
    <div css={{ padding: '0 20px', '@media(max-width: 768px)': { padding: 0 } }}>
      <CommunityBoardArticleTableHeader firstHeader={isBestBoard} />
      <ul>
        {postList?.map((post, idx) => {
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={isBestBoard}
                link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                firstHeader={isBestBoard}
                link={`/${urlLang}/community/board/${boardInfo?.BOARD_IDX}/${post.POST_IDX}`}
                texts={texts}
              />
            </li>
          );
        })}
      </ul>
      <CommunityBoardPagination
        totalCount={boardInfo?.POST_CNT as number}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityBoardArticleTable;
