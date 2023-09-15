import { CommentListItemType } from '@/types/community';
import { useRouter } from 'next/router';
import ReplyCommentListItem from './ReplyCommentListItem';

type ReplyCommentListProps = {
  identity: string;
  totalCount?: string | number;
  replyList: Array<CommentListItemType>;
};

const ReplyCommentList = ({ identity, totalCount, replyList }: ReplyCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 1;

  return (
    <ul data-role="comments">
      {replyList?.map((reply, index) => {
        return (
          <ReplyCommentListItem
            key={`${reply.COMMENT_IDX}_${index}`}
            identity={identity}
            reply={reply}
          />
        );
      })}
    </ul>
  );
};

export default ReplyCommentList;
