import { CommentListItemType } from '@/types/community';
import { useRouter } from 'next/router';
import ReplyCommentListItem from './ReplyCommentListItem';
import { CommunityPostTextType } from '@/types/textTypes';
import { PurPoseType, TargetType } from '@/types/common';

type ReplyCommentListProps = {
  identity: string;
  totalCount?: string | number;
  replyList: Array<CommentListItemType>;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};

const ReplyCommentList = ({
  identity,
  totalCount,
  replyList,
  texts,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: ReplyCommentListProps) => {
  const router = useRouter();
  const page = parseInt(router.query.page as string) | 1;

  // eslint-disable-next-line no-console
  // console.log(replyList);

  return (
    <ul data-role="comments">
      {replyList?.map((reply, index) => {
        return (
          <ReplyCommentListItem
            key={`${reply.COMMENT_IDX}_${index}`}
            identity={identity}
            reply={reply}
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
