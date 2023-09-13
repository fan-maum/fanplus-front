import { OrderType } from '@/types/common';
import {
  CommunityCommentListItemType,
  CommunityPost_CommentListItemType,
  replyResponseType,
} from '@/types/community';
import CommentCard, { CommentCardProps } from './CommentCard';
import { replyResult, replyUnAuthResult } from '@/api/Community';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { cookies } from 'next/dist/client/components/headers';
import { Cookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import ReplyCard from './ReplyCard';

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
  const [replyList, setReplyList] = useState([]);
  const comment_idx = comment.COMMENT_IDX;
  // useEffect(() => {
  //   const replay = await replyUnAuthResult(board_lang, lang, comment_idx, order_by, page);
  // }, []);
  useEffect(() => {
    console.log(comment.RE_COMMENT_CNT !== '0');

    if (comment.RE_COMMENT_CNT !== '0') {
      const response = replyUnAuthResult(board_lang, lang, comment_idx, order_by, page).then(
        (response) => setReplyList(response)
      );
    }
  }, []);

  const ReplyOnToggle = async (comment_idx: string) => {
    if (openToggle === false) {
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
      {/* <div> */}
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {comment.RE_COMMENT_CNT !== '0' && <ReplyCard identity={identity} replyList={replyList} />}
        {/* {reply.write && (
          <FormComment
            uniqueKey={`comment-${comment.id}`}
            variables={{ postID, parentID: comment.id, commentsOrderBy }}
            anonymity={anonymity}
          />
        )}
        {reply.open && comment.childCommentCount > 0 && (
          <ScreenCommentReplyList
            postID={postID}
            childComment={comment.childComment}
            anonymity={anonymity}
          />
        )} */}
      </div>
    </li>
  );
};

export default PostCommentListItem;
