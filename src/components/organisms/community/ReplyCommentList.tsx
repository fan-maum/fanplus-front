import { replyResponseType } from '@/types/community';
import ReplyCommentListItem from './ReplyCommentListItem';
import { CommunityPostTextType } from '@/types/textTypes';
import { PurPoseType, TargetType } from '@/types/common';

type ReplyCommentListProps = {
  identity: string;
  replyList: Array<replyResponseType>;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const ReplyCommentList = ({
  identity,
  replyList,
  texts,
  showModalBlockOnClick,
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
            showModalBlockOnClick={showModalBlockOnClick}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
          />
        );
      })}
    </ul>
  );
};

export default ReplyCommentList;
