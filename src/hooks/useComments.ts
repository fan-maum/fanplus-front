import { getComments } from '@/api/Community';
import { OrderType } from '@/types/common';
import { CommentListItemType, CommentResponseType } from '@/types/community';

type useCommentsProps = {
  params: {
    target: number;
    identity: string; 
  }, 
  page: number, 
  orderType: OrderType,
  commentState: {
    commentList: Array<CommentListItemType>, 
    setCommentList: React.Dispatch<React.SetStateAction<Array<CommentListItemType>>>, 
  }
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default async function useComments({params, page, orderType, commentState, setPage}: useCommentsProps) {
    const {target, identity} = params;
    const {commentList, setCommentList} = commentState;
    const board_lang = "ALL";
    const getCommentResponse: CommentResponseType = await getComments(
        target,
        identity,
        board_lang,
        orderType,
        page,
        20
      );

      const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
      setCommentList([...commentList, ...comments]);
      setPage(page + 1);
}
