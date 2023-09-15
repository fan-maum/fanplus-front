import { useState } from 'react';
import { CommentListItemType, CommentResponseType, replyResponseType } from '@/types/community';
import CommentCard from './CommentCard';
import { getReplies } from '@/api/Community';
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
  comment: CommentListItemType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
};

const PostCommentListItem = ({
  getCommentParams,
  comment,
  onCreateComment,
}: PostCommentListItemProps) => {
  const { identity } = getCommentParams;
  const order_by = 'newest';
  const board_lang = 'ALL';
  const page = 0;
  const per_page = 0;
  const [openToggle, setOpenToggle] = useState(false);
  const [openWriteToggle, setOpenWriteToggle] = useState(false);
  const [replyList, setReplyList] = useState<CommentListItemType[]>([]);
  const [replyTotalCount, setReplyTotalCount] = useState<number>(0);
  const ReplyOnToggle = async (commentIndex: string) => {
    if (openToggle === false) {
      const response = getReplies(
        commentIndex,
        identity,
        board_lang,
        order_by,
        page,
        per_page
      ).then((response: replyResponseType) => setReplyList(response.RESULTS.DATAS.COMMENTS));
      setOpenToggle(true);
      setOpenWriteToggle(false);
    } else {
      setOpenToggle(false);
    }
  };
  // console.log(replyList);

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
            totalCount={replyTotalCount}
            replyList={replyList}
          />
        )}
      </div>
      <div css={{ display: openWriteToggle ? 'block' : 'none' }}>
        <CommentRegister
          identity={identity}
          POST_IDX={comment.COMMENT_IDX}
          WRITER_PROFILE_IMG={comment.PROFILE_IMG_URL}
          createMode={'comment'}
          onCreateComment={onCreateComment}
        />
      </div>
    </li>
  );
};

export default PostCommentListItem;
