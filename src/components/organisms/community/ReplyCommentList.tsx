import { replyResponseType } from '@/types/community';
import ReplyCommentListItem from './ReplyCommentListItem';
import { CommunityPostTextType } from '@/types/textTypes';

type ReplyCommentListProps = {
  identity: string;
  replyList: replyResponseType;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
};

const ReplyCommentList = ({ identity, replyList, texts, replyRefetch }: ReplyCommentListProps) => {
  return (
    <ul data-role="comments">
      {replyList && (
        <ReplyCommentListItem
          identity={identity}
          replies={replyList}
          texts={texts}
          replyRefetch={replyRefetch}
        />
      )}
    </ul>
  );
};

export default ReplyCommentList;
