import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type {
  CommunityMainPageResponseType,
  NoticeListItemType,
  PostListItemType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';
import CommunityBoardNoticeArticleMobile from '@/components/molecules/community/CommunityBoardNoticeArticleMobile';

type BoardArticleTableProps = {
  communityBoardData: CommunityMainPageResponseType;
  communityBoardDataSSR: CommunityMainPageResponseType;
  isFetching: boolean;
  texts: CommunityBoardTextType;
  boardType: string | undefined;
  isStarBoardTableHeader?: boolean;
};

const CommunityTypeBoardArticleTable = ({
  communityBoardData,
  communityBoardDataSSR,
  isFetching,
  texts,
  boardType,
  isStarBoardTableHeader,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const tableHeader = isStarBoardTableHeader ? 'board' : 'topic';

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
    return <CommunityBoardNoPost buttonText={texts.buttonWrite} texts={texts.noPostTexts} />;
  }
  const urlPage = router.query.page || 1;
  const urlPath = !boardType ? router.query.boardIndex : boardType;

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
        {noticeList?.map((notice: NoticeListItemType, idx: number) => {
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
        {postList?.map((post: PostListItemType, idx: number) => {
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={post.BOARD_TITLE}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                texts={texts}
              />
            </li>
          );
        })}
      </ul>
      <CommunityBoardPagination
        boardType={boardType}
        viewPossiblePage={Number(boardInfo.VIEW_POSSIBLE_PAGE)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityTypeBoardArticleTable;
