import { replyResponseType } from '@/types/community';
import ReplyCommentListItem from './ReplyCommentListItem';
import { CommunityPostTextType } from '@/types/textTypes';
import { PurPoseType, TargetType } from '@/types/common';

type ReplyCommentListProps = {
  identity: string;
  replyList: Array<replyResponseType>;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const ReplyCommentList = ({
  identity,
  replyList,
  texts,
  replyRefetch,
  showReportModalBlockOnClick,
}: ReplyCommentListProps) => {
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
            showReportModalBlockOnClick={showReportModalBlockOnClick}
          />
        );
      })}
    </ul>
  );
};

export default ReplyCommentList;
