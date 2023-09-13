import { useState } from 'react';
import {
  CommunityCommentListItemType,
  CommunityPost_CommentListItemType,
  replyResponseType,
} from '@/types/community';
import CommentCard, { CommentCardProps } from './CommentCard';
import { replyResult, replyUnAuthResult } from '@/api/Community';
import { Cookies } from 'react-cookie';
import ReplyCommentList from './ReplyCommentList';

type PostCommentListItemProps = {
  identity: string;
  comment: CommunityPost_CommentListItemType;
  // comment: CommunityCommentListItemType;
};

const PostCommentListItem = ({ identity, comment }: PostCommentListItemProps) => {
  // const router = useRouter();
  const cookies = new Cookies();
  const lang = cookies.get('USER_LANG') || 'ko';
  const order_by = 'newest';
  const board_lang = 'ko-en-ja-es-vi-id-zh-zhtw';
  const page = 0;
  // const res = replyResult(lang, comment.COMMENT_IDX, order_by, identity, page);
  // console.log
  const [openToggle, setOpenToggle] = useState(false);
  const [replyList, setReplyList] = useState(Object);
  const ReplyOnToggle = async (comment_idx: string) => {
    if (openToggle === false) {
      const response = replyUnAuthResult(board_lang, lang, comment_idx, order_by, page).then(
        (response) => setReplyList(response.RESULTS.DATAS)
      );
      setOpenToggle(true);
    } else {
      setOpenToggle(false);
    }
  };

  const commentCardProps: CommentCardProps = {
    identity,
    comment,
    ReplyOnToggle,
  };
  
  return (
    <li className="comment" css={{ borderBottom: '1px solid #f1f1f1' }}>
      <CommentCard
        identity={identity}
        comment={comment}
        ReplyOnToggle={() => ReplyOnToggle(comment.COMMENT_IDX)}
      />
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {comment.RE_COMMENT_CNT !== '0' && <ReplyCommentList identity={identity} totalCount={replyList.TOTAL_CNT} replyList={replyList.COMMENTS} />}
      </div>
    </li>
  );
};

export default PostCommentListItem;
