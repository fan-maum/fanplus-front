import styled from '@emotion/styled';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { colors } from '@/styles/CommunityColors';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/Cookie';
import { useBookmarkOnClick } from '@/hooks/useBookmarkOnClick';

type BoardMobileTitleProps = {
  boardTitle: string;
  bookmarked?: boolean;
  menuId?: number;
  onClickBack: () => void;
};

const BoardMobileTitle = ({
  boardTitle,
  bookmarked,
  menuId,
  onClickBack,
}: BoardMobileTitleProps) => {
  const router = useRouter();
  const path = router.asPath;
  const user_id = getCookie('user_id');

  const { useAddBookmark, useRemoveBookmark } = useBookmarkOnClick();

  const handleBookmarkOnClick = async (menuId: number) => {
    if (!user_id) {
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    if (bookmarked) {
      useRemoveBookmark.mutate({ identity: user_id, menuId });
    } else {
      useAddBookmark.mutate({ identity: user_id, menuId });
    }
  };

  return (
    <BoardMobileTitleWrapper>
      {/* <IconArrowLeft
        iconCss={{ margin: '3px', width: '24px', height: '24px', cursor: 'pointer' }}
        onClickBack={onClickBack}
      /> */}
      <h1
        css={{
          fontSize: '18px',
          fontWeight: 600,
          color: colors.gray[1000],
          wordBreak: 'keep-all',
        }}
      >
        {boardTitle}
      </h1>
      {bookmarked !== undefined && (
        <BookmarkButton
          isBookmarked={bookmarked}
          width="24"
          height="24"
          onClick={() => handleBookmarkOnClick(Number(menuId))}
        />
      )}
    </BoardMobileTitleWrapper>
  );
};

export default BoardMobileTitle;

const BoardMobileTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  height: 40px;
  padding-left: 8px;

  .table-title {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.gray[1000]};
    word-break: keep-all;
  }
`;
