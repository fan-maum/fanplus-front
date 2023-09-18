import { CommentListItemType } from '@/types/community';
import ReplyCard from './ReplyCard';
import { PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';

type PostCommentListItemProps = {
  identity: string;
  reply: CommentListItemType;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const ReplyCommentListItem = ({
  identity,
  reply,
  texts,
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
        texts={texts}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
    </li>
  );
};

export default ReplyCommentListItem;
