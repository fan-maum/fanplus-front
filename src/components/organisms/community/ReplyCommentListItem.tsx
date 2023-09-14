import {
    CommunityCommentListItemType,
  CommunityPost_CommentListItemType,
} from '@/types/community';
import ReplyCard from './ReplyCard';

type PostCommentListItemProps = {
  identity: string;
  reply: CommunityCommentListItemType;
};

const ReplyCommentListItem = ({ identity, reply }: PostCommentListItemProps) => {
  return (
    <li className="comment" css={{ borderTop: '1px solid #f1f1f1', width: "calc(100% - 74px)", margin: "0 0 0 auto"}}>
      <ReplyCard
        identity={identity}
        reply={reply}
      />
    </li>
  );
};

export default ReplyCommentListItem;
