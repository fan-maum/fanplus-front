import styled from '@emotion/styled';
import IconBookmark from './IconBookmark';

export default function BookmarkButton() {
  let viewerHasBookmarked = true;
  //   const { id: menuID, viewerHasBookmarked } = bookmarkInfo;
  //   const { id: userID } = useUser();

  //   const [addBookmarkMutation, removeBookmarkMutation, loading] = useBookmarkMutations(menuID);

  const handleBookmarkButtonClick = () => {
    // if (loading) return;

    // if (!userID) {
    //   window.location.href = `/login?next=${window.location.href}`;
    //   return;
    // }

    // if (viewerHasBookmarked) {
    //   removeBookmarkMutation();
    //   return;
    // }

    // addBookmarkMutation();

    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  return (
    <BookmarkButtonWrapper data-role="북마크-버튼">
      <IconBookmark isActive={viewerHasBookmarked} onClick={handleBookmarkButtonClick} />
    </BookmarkButtonWrapper>
  );
}

const BookmarkButtonWrapper = styled.div`
  path {
    transition: 0.15s;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      path {
        fill: #ff930f;
      }
    }
  }
`;
