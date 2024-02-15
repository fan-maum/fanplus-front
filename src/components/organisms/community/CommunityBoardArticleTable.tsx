import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type {
  CommunityBoardAllResponseType,
  CommunityBoardMyPostResponseType,
  CommunityBoardResponseType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';
import CommunityBoardNoticeArticleMobile from '@/components/molecules/community/CommunityBoardNoticeArticleMobile';

type BoardArticleTableProps = {
  communityBoardData: CommunityBoardResponseType;
  communityBoardSSRdata:
    | CommunityBoardResponseType
    | CommunityBoardAllResponseType
    | CommunityBoardMyPostResponseType;
  isFetching: boolean;
  texts: CommunityBoardTextType;
  boardType: string | number;
};

const CommunityBoardArticleTable = ({
  communityBoardData,
  communityBoardSSRdata,
  isFetching,
  texts,
  boardType,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const isBoardNameTableHeader = boardType === 'community' || boardType === '2291';
  const tableHeader = isBoardNameTableHeader ? 'board' : 'topic';

  const handlePageChange = async (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } }, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const noticeList = (communityBoardData || communityBoardSSRdata).NOTICE;
  const postList = (communityBoardData || communityBoardSSRdata).POST_LIST;
  const boardInfo = (communityBoardData || communityBoardSSRdata).BOARD_INFO;

  const isPostExist = !(
    postList?.length === 0 &&
    (!router.query.page || router.query.page === '1')
  );

  if (isFetching) return <CommunityBoardArticleTableSkeleton firstHeader={tableHeader} />;
  if (!isPostExist) {
    return <CommunityBoardNoPost buttonText={texts.buttonWrite} texts={texts.noPostTexts} />;
  }
  const urlPage = router.query.page || 1;
  const urlPath = boardType;

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
          const domain = router.query.domain;
          const postArticleUrl = domain
            ? `/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}&domain=${domain}`
            : `/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`;
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={isBoardNameTableHeader ? post.BOARD_TITLE : post.TOPIC_NAME}
                link={postArticleUrl}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                link={postArticleUrl}
                texts={texts}
                showTopic={isBoardNameTableHeader ? false : true}
              />
            </li>
          );
        })}
      </ul>
      <CommunityBoardPagination
        viewPossiblePage={Number(boardInfo.VIEW_POSSIBLE_PAGE)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityBoardArticleTable;
