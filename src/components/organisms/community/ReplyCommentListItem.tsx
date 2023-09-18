import { CommentListItemType } from '@/types/community';
import ReplyCard from './ReplyCard';
import { PurPoseType, TargetType } from '@/types/common';

type PostCommentListItemProps = {
  identity: string;
  reply: CommentListItemType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const ReplyCommentListItem = ({
  identity,
  reply,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: PostCommentListItemProps) => {
  return (
    <li
      className="comment"
      css={{ borderTop: '1px solid #f1f1f1', width: 'calc(100% - 74px)', margin: '0 0 0 auto' }}
    >
      <ReplyCard
        identity={identity}
        reply={reply}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
    </li>
  );
};

export default ReplyCommentListItem;
