import { CommunityBoardResponseType } from '@/types/community';
import CommunityBoardArticleTable from '../organisms/community/CommunityBoardArticleTable';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { BoardLangType, UrlLangType } from '@/types/common';
import BookmarkArticleTable from '../organisms/community/mobile/BookmarkArticleTable';
import { UnstyledButton } from '../atoms';
import { colors } from '@/styles/CommunityColors';

type CommunityBookmarkTemplateProps = {
  queryParams: {
    urlLang: UrlLangType;
    userId: string;
    boardLangCookie: BoardLangType;
    maxPage: number;
  };
  bookmarkBoards: Array<CommunityBoardResponseType>;
};

const CommunityBookmarkTemplate = ({
  queryParams,
  bookmarkBoards,
}: CommunityBookmarkTemplateProps) => {
  const { urlLang } = queryParams;
  const boardTexts = communityBoardTexts[urlLang];
  console.log('bookmarkBoards', bookmarkBoards);

  return (
    <div>
      <div>
        {bookmarkBoards.map((boardData, index) => (
          <BookmarkArticleTable
            key={index}
            communityBoardData={boardData}
            communityBoardSSRdata={boardData}
            isFetching={null}
            texts={boardTexts}
            boardType={String(13)}
          />
        ))}
      </div>
      <div css={{ textAlign: 'center', marginTop: '8px' }}>
        <UnstyledButton
          css={{
            dispaly: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '6px 8px',
            height: '28px',
            backgroundColor: colors.gray[100],
            color: colors.gray[1000],
            fontSize: '14px',
            borderRadius: '6px',
            fontWeight: 600,
          }}
        >
          게시판 메뉴보기
        </UnstyledButton>
      </div>
    </div>
  );
};

export default CommunityBookmarkTemplate;
