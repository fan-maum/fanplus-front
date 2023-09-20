import { CommentResponseType } from '@/types/community';
import PostCommentListItem from './PostCommentListItem';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';

type PostCommentListProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  comments: CommentResponseType;
  texts: CommunityPostTextType;
  profileInfo: { profileImg: string; profileNick: string };
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  refetch: () => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
};

const PostCommentList = ({
  getCommentParams,
  comments,
  texts,
  profileInfo,
  onCreateComment,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
  refetch,
  refetchReplyOnToggle,
  replyData,
}: PostCommentListProps) => {
  const comment = comments.RESULTS.DATAS.COMMENTS;
  return (
    <ul data-role="comments">
      {comment &&
        comment.map((item: any, index) => (
          <PostCommentListItem
            key={`${index}`}
            getCommentParams={getCommentParams}
            item={item}
            texts={texts}
            profileInfo={profileInfo}
            onCreateComment={onCreateComment}
            showModalBlockOnClick={showModalBlockOnClick}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
            refetchReplyOnToggle={refetchReplyOnToggle}
            replyData={replyData}
          />
        ))}
    </ul>
  );
};

export default PostCommentList;
