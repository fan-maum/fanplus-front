import CommunityBoardArticle from '@/components/molecules/community/CommunityBoardArticle';
import CommunityBoardArticleMobile from '@/components/molecules/community/CommunityBoardArticleMobile';
import { CommunityBoardArticleTableSkeleton } from '@/components/molecules/community/CommunitySkeleton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import type {
  CommunityBoardAllResponseType,
  CommunityBoardMyPostResponseType,
  CommunityBoardResponseType,
} from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import CommunityBoardNoPost from '../CommunityBoardNoPost';
import { colors } from '@/styles/CommunityColors';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { UnstyledButton } from '@/components/atoms';
import { bookmarkTexts } from '@/texts/bookmarkTexts';

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

const BookmarkArticleTable = ({
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
  const boardInfo = (communityBoardData || communityBoardSSRdata).BOARD_INFO;
  const postList = (communityBoardData || communityBoardSSRdata).POST_LIST;
  const bookmarksTexts = bookmarkTexts[urlLang];

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

  const boardTitle = boardInfo?.photocard_board_lang
    ? boardInfo?.photocard_board_lang[0].TITLE
    : boardInfo?.menuId === 1
    ? '전체글'
    : '';

  return (
    <div css={{ marginTop: '16px' }}>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
          height: '40px',
        }}
      >
        <h3 css={{ fontSize: 16, fontWeight: 600, color: `${colors.gray[1000]}` }}>{boardTitle}</h3>
        <UnstyledButton
          css={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600 }}
        >
          {bookmarksTexts.seeMore}
          <IconArrowLeft
            iconCss={{ width: '14px', height: '14px', transform: 'rotateZ(180deg)' }}
          />
        </UnstyledButton>
      </div>
      <ul>
        {postList?.map((post, idx) => {
          return (
            <li key={'CommunityBoardArticle' + idx} css={{ borderBottom: '1px solid #d9d9d9' }}>
              <CommunityBoardArticle
                postItem={post}
                firstHeader={isBoardNameTableHeader ? post.BOARD_TITLE : post.TOPIC_NAME}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
              />
              <CommunityBoardArticleMobile
                postItem={post}
                link={`/${urlLang}/community/board/${post.BOARD_IDX}/${post.POST_IDX}?page=${urlPage}&from=${urlPath}`}
                texts={texts}
                showTopic={isBoardNameTableHeader ? false : true}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookmarkArticleTable;
