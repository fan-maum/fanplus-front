import { replyResponseType } from '@/types/community';
import ReplyCommentListItem from './ReplyCommentListItem';
import { CommunityPostTextType } from '@/types/textTypes';

type ReplyCommentListProps = {
  identity: string;
  replyList: Array<replyResponseType>;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
};

const ReplyCommentList = ({ identity, replyList, texts, replyRefetch }: ReplyCommentListProps) => {
  return (
    <ul data-role="comments">
      {replyList?.map((replies, index) => {
        return (
          <ReplyCommentListItem
            key={`${index}`}
            identity={identity}
            replies={replies}
            texts={texts}
            replyRefetch={replyRefetch}
          />
        );
      })}
    </ul>
  );
};

export default ReplyCommentList;
