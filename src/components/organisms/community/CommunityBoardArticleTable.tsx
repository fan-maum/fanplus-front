import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';
import CommunityBoardNoticeArticleMobile from '@/components/molecules/community/CommunityBoardNoticeArticleMobile';

type BoardArticleTableProps = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardDataSSR: CommunityBoardResponseType;
  isFetching: boolean;
  texts: CommunityBoardTextType;
  isStarBoardTableHeader?: boolean;
  onClickWrite: () => void;
};

const CommunityBoardArticleTable = ({
  communityBoardData,
  communityBoardDataSSR,
  isFetching,
  texts,
  isStarBoardTableHeader,
  onClickWrite,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const { boardIndex: urlBoardIndex } = router.query;
  const isBestBoard = urlBoardIndex === '2291' || router.query.boardType === '2291';
  const currentBoardIndex = isBestBoard ? 2291 : Number(router.query.boardIndex);

  const tableHeader = isStarBoardTableHeader || isBestBoard ? 'board' : 'topic';

  const handlePageChange = async (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } }, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const noticeList = (communityBoardData || communityBoardDataSSR).NOTICE;
  const postList = (communityBoardData || communityBoardDataSSR).POST_LIST;
  const boardInfo = (communityBoardData || communityBoardDataSSR).BOARD_INFO;

  const isPostExist = !(
    postList?.length === 0 &&
    (!router.query.page || router.query.page === '1')
  );

  if (isFetching) return <CommunityBoardArticleTableSkeleton firstHeader={tableHeader} />;
  if (!isPostExist) {
    return (
      <CommunityBoardNoPost
        // onClickWrite={onClickWrite}
        buttonText={texts.buttonWrite}
        texts={texts.noPostTexts}
      />
    );
  }
  const urlPage = router.query.page || 1;
  const urlPath = currentBoardIndex;

  const noticeHeader = (
    <div
      css={{
        flex: 1,
        width: 'max-content',
        border: '1px solid #ff5656',
        borderRadius: '4px',
        margin: 'auto',
        padding: '5px 10px',
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#ff5656',
      }}
    >
      {texts.notice}
    </div>
  );

  return (
    <div>
      <CommunityBoardArticleTableHeader firstHeader={tableHeader} />
      <ul>
        {noticeList?.map((notice, idx) => {
          return (
            <li key={'CommunityBoardNotice' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={notice}
                firstHeader={noticeHeader}
                link={`/${urlLang}/community/board/${notice.BOARD_IDX}/${notice.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                isNotice
              />
              <CommunityBoardNoticeArticleMobile
                postItem={notice}
                firstHeader={noticeHeader}
                link={`/${urlLang}/community/board/${notice.BOARD_IDX}/${notice.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                texts={texts}
                isNotice
              />
            </li>
          );
        })}
        {postList?.map((post, idx) => {
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={
                  isStarBoardTableHeader || isBestBoard ? post.BOARD_TITLE : post.TOPIC_NAME
                }
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                texts={texts}
                showTopic={isStarBoardTableHeader || isBestBoard ? false : true}
              />
            </li>
          );
        })}
      </ul>
      <CommunityBoardPagination
        totalCount={Number(boardInfo?.POST_CNT)}
        viewPossiblePage={0}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityBoardArticleTable;
