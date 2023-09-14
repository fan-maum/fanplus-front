import { useState } from 'react';
import { CommunityPost_CommentListItemType } from '@/types/community';
import CommentCard from './CommentCard';
import { replyResult, replyUnAuthResult } from '@/api/Community';
import ReplyCommentList from './ReplyCommentList';
import { BackLangType, TargetType } from '@/types/common';
import CommentRegister from './CommentRegister';

type PostCommentListItemProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  comment: CommunityPost_CommentListItemType;
  // comment: CommunityCommentListItemType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: string,
    contents: any
  ) => void;
};

const PostCommentListItem = ({
  getCommentParams,
  comment,
  onCreateComment,
}: PostCommentListItemProps) => {
  const { identity } = getCommentParams;
  const lang = getCommentParams.lang || 'ko';
  const order_by = 'newest';
  const board_lang = 'ko-en-ja-es-vi-id-zh-zhtw';
  const page = 0;
  const [openToggle, setOpenToggle] = useState(false);
  const [openWriteToggle, setOpenWriteToggle] = useState(false);
  const [replyList, setReplyList] = useState(Object);
  const ReplyOnToggle = async (comment_idx: string) => {
    if (openToggle === false) {
      const response = replyUnAuthResult(board_lang, lang, comment_idx, order_by, page).then(
        (response) => setReplyList(response.RESULTS.DATAS)
      );
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
    <li className="comment" css={{ borderBottom: '1px solid #f1f1f1' }}>
      <CommentCard
        identity={identity}
        comment={comment}
        ReplyOnToggle={() => ReplyOnToggle(comment.COMMENT_IDX)}
        ReplyWriteOnToggle={ReplyWriteOnToggle}
      />
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {comment.RE_COMMENT_CNT !== '0' && (
          <ReplyCommentList
            identity={identity}
            totalCount={replyList.TOTAL_CNT}
            replyList={replyList.COMMENTS}
          />
        )}
      </div>
      <div css={{ display: openWriteToggle ? 'block' : 'none' }}>
        <CommentRegister
          identity={identity}
          POST_IDX={comment.COMMENT_IDX}
          WRITER_PROFILE_IMG={comment.USER_PROFILE_IMG}
          createMode={'comment'}
          onCreateComment={onCreateComment}
        />
      </div>
    </li>
  );
};

export default PostCommentListItem;
