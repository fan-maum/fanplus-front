import { NextRouter } from "next/router";
import { deleteLikes, postLikes } from "@/api/Community";
import { CommentListItemType } from "@/types/community";

export async function useLikesButtonOnClick({identity, comment, refetchFunc, router}: LikesOnClickProps) {
  if (identity !== null) {
    if (comment.ALREADY_LIKE === 'Y') {
      await deleteLikes(comment.COMMENT_IDX, identity);
    } else {
      await postLikes(comment.COMMENT_IDX, identity);
    }
    await refetchFunc();
  } else {
    const path = router.asPath;
    router.push({ pathname: '/login', query: { nextUrl: path } });
  }
}

export type LikesOnClickProps = {
    identity: string;
    comment: CommentListItemType;
    refetchFunc: () => void;
    router: NextRouter;
}