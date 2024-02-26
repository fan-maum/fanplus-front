import { useState } from 'react';
import { CommentListItemType } from '@/types/community';
import CommentCard from './CommentCard';
import ReplyCommentList from './ReplyCommentList';
import { TargetType } from '@/types/common';
import { CommunityPostTextType } from '@/types/textTypes';
import ReplyRegister from './ReplyRegister';
import { useRecoilValue } from 'recoil';
import { postParamState } from '@/store/community';
import { colors } from '@/styles/CommunityColors';

type PostCommentListItemProps = {
  item: CommentListItemType;
  texts: CommunityPostTextType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
  refetch: () => void;
  replyRefetch: () => void;
  refetchReplyOnToggle: (commentIndex: number) => void;
  replyData: any;
};

const PostCommentListItem = ({
  item,
  texts,
  refetch,
  onCreateComment,
  replyRefetch,
  refetchReplyOnToggle,
  replyData,
}: PostCommentListItemProps) => {
  const postParam = useRecoilValue(postParamState);
  const identity = postParam.identity;
  const [openToggle, setOpenToggle] = useState(false);
  const [openWriteToggle, setOpenWriteToggle] = useState(false);
  const [closeReply, setCloseReply] = useState(false);

  const ReplyOnToggle = async (commentIndex: number) => {
    if (openToggle === false) {
      refetchReplyOnToggle(commentIndex);
      setOpenToggle(true);
      setOpenWriteToggle(false);
      setCloseReply(true);
    } else {
      setOpenToggle(false);
      setCloseReply(false);
    }
  };

  const ReplyWriteOnToggle = async () => {
    setCloseReply(false);
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
        borderTop: `1px solid ${colors.gray[200]}`,
        '&:first-of-type': {
          borderTop: 'none',
        },
      }}
    >
      <CommentCard
        identity={identity}
        comment={item}
        texts={texts}
        closeReply={closeReply}
        refetch={refetch}
        ReplyOnToggle={() => ReplyOnToggle(Number(item.COMMENT_IDX))}
        ReplyWriteOnToggle={ReplyWriteOnToggle}
      />
      <div css={{ display: openToggle ? 'block' : 'none' }}>
        {item.RE_COMMENT_CNT !== '0' && (
          <ReplyCommentList
            identity={identity}
            replyList={replyData?.pages}
            texts={texts}
            replyRefetch={replyRefetch}
          />
        )}
      </div>
      <div css={{ display: openWriteToggle ? 'block' : 'none' }}>
        <ReplyRegister
          identity={identity}
          texts={texts}
          POST_IDX={item.COMMENT_IDX}
          createMode={'comment'}
          onCreateComment={onCreateComment}
        />
      </div>
    </li>
  );
};

export default PostCommentListItem;
