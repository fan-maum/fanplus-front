import { useState } from 'react';
import { CommentListItemType, CommentResponseType, replyResponseType } from '@/types/community';
import CommentCard from './CommentCard';
import { getReplies } from '@/api/Community';
import ReplyCommentList from './ReplyCommentList';
import { BackLangType, PurPoseType, TargetType } from '@/types/common';
import CommentRegister from './CommentRegister';

type PostCommentListItemProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  item: CommentListItemType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  showModalBlockOnClick: (purpose: PurPoseType,target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType,target_type: TargetType, idx: string) => void;
};

const PostCommentListItem = ({
  getCommentParams,
  item,
  onCreateComment,
  showModalBlockOnClick,
  showReportModalBlockOnClick
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

  const ReplyOnToggle = async (commentIndex: number) => {
    if (openToggle === false) {
      const response:replyResponseType = await getReplies(
        commentIndex,
        identity,
        board_lang,
        order_by,
        page,
        per_page
      );
      setReplyList(response.RESULTS.DATAS.COMMENTS);
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
        comment={item}
        ReplyOnToggle={() => ReplyOnToggle(Number(item.COMMENT_IDX))}
        ReplyWriteOnToggle={ReplyWriteOnToggle}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {item.RE_COMMENT_CNT !== '0' && (
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
          POST_IDX={item.COMMENT_IDX}
          WRITER_PROFILE_IMG={item.PROFILE_IMG_URL}
          createMode={'comment'}
          onCreateComment={onCreateComment}
        />
      </div>
    </li>
  );
};

export default PostCommentListItem;