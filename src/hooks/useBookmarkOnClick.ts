import { NextRouter } from 'next/router';
import { deleteBookmark, postBookmark } from '@/api/Community';

export async function useBookmarkOnClick({
  identity,
  isBookmarked,
  board_idx,
  refetchFunc,
  router,
}: BookmarkOnClickProps) {
  if (identity !== null) {
    if (isBookmarked) {
      await deleteBookmark(identity, board_idx);
    } else {
      await postBookmark(identity, board_idx);
    }
    await refetchFunc();
  } else {
    const path = router.asPath;
    router.push({ pathname: '/login', query: { nextUrl: path } });
  }
}

export type BookmarkOnClickProps = {
  identity: string;
  isBookmarked: boolean;
  board_idx: string;
  refetchFunc: () => void;
  router: NextRouter;
};
