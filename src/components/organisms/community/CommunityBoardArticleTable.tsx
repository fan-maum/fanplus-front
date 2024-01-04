import { getCommunityBoardData } from '@/api/Community';
import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import CommunityBoardArticleTableHeader from '@/components/molecules/community/CommunityBoardArticleTableHeader';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType } from '@/types/common';
import type {
  CommunityBoardResponseType,
  GlobalNoticesResponseType,
  PostListItemType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CommunityBoardPagination from '../CommunityBoardPagination';
import CommunityBoardNoPost from './CommunityBoardNoPost';

type BoardArticleTableProps = {
  globalNotices: GlobalNoticesResponseType;
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
  globalNotices,
  communityBoardDataSSR,
  texts,
  queries,
  isInitialData,
  onClickWrite,
}: BoardArticleTableProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
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

  const handlePageChange = async (selectedItem: { selected: number }) => {
    router.replace({ query: { ...router.query, page: selectedItem.selected + 1 } }, undefined, {
      shallow: true,
      scroll: true,
    });
  };

  const noticeList = globalNotices.NOTICE;
  const postList = communityBoardData?.POST_LIST;
  const boardInfo = communityBoardData?.BOARD_INFO[0];

  const isPostExist = !(
    postList?.length === 0 &&
    (!router.query.page || router.query.page === '1')
  );

  if (isFetching) return <CommunityBoardArticleTableSkeleton firstHeader={isBestBoard} />;
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
  const urlPath = router.query.boardIndex;

  const noticeHeader = (
    <div
      css={{
        width: 'fit-content',
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
      <CommunityBoardArticleTableHeader firstHeader={isBestBoard} />
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
            </li>
          );
        })}
        {postList?.map((post, idx) => {
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={post.TOPIC_NAME}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                texts={texts}
                showTopic
              />
            </li>
          );
        })}
      </ul>
      <CommunityBoardPagination
        totalCount={Number(boardInfo?.POST_CNT)}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default CommunityBoardArticleTable;

// TODO: sampleNotice 제거
const sampleNotice: PostListItemType[] = [
  {
    POST_IDX: '6721126',
    BOARD_IDX: '91',
    TOPIC_NAME: '소통',
    POST_TITLE: '가나다',
    POST_IMG_YN: 'N',
    SUMNAIL_IMG: 'http://cdnetphoto.appphotocard.com/',
    WRITER_IDX: '4112465',
    PUBLISH_DATE: '2023-11-29 15:48:29',
    VIEW_CNT: '6',
    COMMENT_CNT: '0',
    RECOMMEND_CNT: '0',
    HAS_BEST_BADGE: '0',
    HAS_POPULAR_BADGE: '0',
    HEAD_IDX: null,
    HEAD_NAME: null,
    WRITER_NAME: 'hjHippopotamus430',
    WRITER_PROFILE_IMG:
      'http://cdnetphoto.appphotocard.com/profile_images/profile_image_default.png',
    NEW_POST_YN: 'N',
  },
  {
    POST_IDX: '6721125',
    BOARD_IDX: '91',
    TOPIC_NAME: '소통',
    POST_TITLE: 'ㄹㄹㄹ',
    POST_IMG_YN: 'N',
    SUMNAIL_IMG: 'http://cdnetphoto.appphotocard.com/',
    WRITER_IDX: '4097293',
    PUBLISH_DATE: '2023-11-29 15:46:59',
    VIEW_CNT: '2',
    COMMENT_CNT: '1',
    RECOMMEND_CNT: '0',
    HAS_BEST_BADGE: '0',
    HAS_POPULAR_BADGE: '0',
    HEAD_IDX: null,
    HEAD_NAME: null,
    WRITER_NAME: '관측하는별자리12',
    WRITER_PROFILE_IMG:
      'http://cdnetphoto.appphotocard.com/profile_images/20230830120449_4097293.png',
    NEW_POST_YN: 'N',
  },
  {
    POST_IDX: '6721098',
    BOARD_IDX: '91',
    TOPIC_NAME: '소통',
    POST_TITLE: 'ㄹㄹ2222',
    POST_IMG_YN: 'N',
    SUMNAIL_IMG: 'http://cdnetphoto.appphotocard.com/',
    WRITER_IDX: '4097293',
    PUBLISH_DATE: '2023-11-29 14:44:14',
    VIEW_CNT: '2',
    COMMENT_CNT: '4',
    RECOMMEND_CNT: '0',
    HAS_BEST_BADGE: '0',
    HAS_POPULAR_BADGE: '0',
    HEAD_IDX: null,
    HEAD_NAME: null,
    WRITER_NAME: '관측하는별자리12',
    WRITER_PROFILE_IMG:
      'http://cdnetphoto.appphotocard.com/profile_images/20230830120449_4097293.png',
    NEW_POST_YN: 'N',
  },
];
