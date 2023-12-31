import { replyResponseType } from '@/types/community';
import ReplyCard from './ReplyCard';
import { PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';

type PostCommentListItemProps = {
  identity: string;
  replies: replyResponseType;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
};

const ReplyCommentListItem = ({
  identity,
  replies,
  texts,
  replyRefetch,
}: PostCommentListItemProps) => {
  const repiesData = replies.RESULTS.DATAS.COMMENTS;

  return (
    <>
      {repiesData &&
        repiesData.map((reply: any, index) => (
          <li
            key={index}
            className="comment"
            css={{
              borderTop: '1px solid #f1f1f1',
              width: 'calc(100% - 74px)',
              margin: '0 0 0 auto',
            }}
          >
            <ReplyCard
              identity={identity}
              reply={reply}
              texts={texts}
              replyRefetch={replyRefetch}
            />
          </li>
        ))}
    </>
  );
};

export default ReplyCommentListItem;
