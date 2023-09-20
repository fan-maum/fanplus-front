import { useState } from 'react';
import { CommentListItemType } from '@/types/community';
import CommentCard from './CommentCard';
import ReplyCommentList from './ReplyCommentList';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';
import ReplyRegister from './ReplyRegister';

type PostCommentListItemProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  item: CommentListItemType;
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
  replyRefetch: () => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
};

const PostCommentListItem = ({
  getCommentParams,
  item,
  texts,
  profileInfo,
  refetch,
  onCreateComment,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
  replyRefetch,
  refetchReplyOnToggle,
  replyData,
}: PostCommentListItemProps) => {
  const { identity } = getCommentParams;
  const [openToggle, setOpenToggle] = useState(false);
  const [openWriteToggle, setOpenWriteToggle] = useState(false);

  const ReplyOnToggle = async (commentIndex: number) => {
    if (openToggle === false) {
      refetchReplyOnToggle(commentIndex);
      setOpenToggle(true);
      setOpenWriteToggle(false);
    } else {
      setOpenToggle(false);
    }
  };

  const ReplyWriteOnToggle = async () => {
    if (openWriteToggle === false) {
      setOpenWriteToggle(true);
      setOpenToggle(false);
    } else {
      setOpenWriteToggle(false);
    }
  };

  return (
    <li
      className="comment"
      css={{
        borderBottom: '1px solid #f1f1f1',
        '&:last-child': {
          borderBottom: 'none',
        },
      }}
    >
      <CommentCard
        identity={identity}
        comment={item}
        texts={texts}
        refetch={refetch}
        ReplyOnToggle={() => ReplyOnToggle(Number(item.COMMENT_IDX))}
        ReplyWriteOnToggle={ReplyWriteOnToggle}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {item.RE_COMMENT_CNT !== '0' && (
          <ReplyCommentList
            identity={identity}
            replyList={replyData?.pages}
            texts={texts}
            replyRefetch={replyRefetch}
            showModalBlockOnClick={showModalBlockOnClick}
            showReportModalBlockOnClick={showReportModalBlockOnClick}
          />
        )}
      </div>
      <div css={{ display: openWriteToggle ? 'block' : 'none' }}>
        <ReplyRegister
          identity={identity}
          texts={texts}
          POST_IDX={item.COMMENT_IDX}
          profileInfo={profileInfo}
          createMode={'comment'}
          onCreateComment={onCreateComment}
        />
      </div>
    </li>
  );
};

export default PostCommentListItem;
