import { useState } from 'react';
import { deleteLikes, postLikes } from '@/api/Community';
import { Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommentListItemType } from '@/types/community';
import IconReply from '@/components/atoms/IconReply';

export type CommentCardProps = {
  identity: string;
  comment: CommentListItemType;
  ReplyOnToggle?: (comment_idx: any) => void;
  ReplyWriteOnToggle?: () => void;
};
const CommentCard = ({
  identity,
  comment,
  ReplyOnToggle,
  ReplyWriteOnToggle,
}: CommentCardProps) => {
  const [likes, setLikes] = useState(false);
  const LikesOnClick = async () => {
    if (identity !== null) {
      if (comment.ALREADY_LIKE === 'Y' || likes === true) {
        const res = await deleteLikes(comment.COMMENT_IDX, identity);
        setLikes(false);
      } else {
        const res = await postLikes(comment.COMMENT_IDX, identity);
        setLikes(true);
      }
    } else {
      alert('로그인해주세요.');
    }
  };

  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState identity={identity} comment={comment} />
      <Group position="apart" ml={68}>
        <div>
          {comment.RE_COMMENT_CNT !== '0' && (
            <>
              <UnstyledButton
                fz={16}
                fw={400}
                css={{ color: '#999', marginRight: 22 }}
                onClick={ReplyOnToggle}
              >
                답글 {comment.RE_COMMENT_CNT}
                <IconReply />
              </UnstyledButton>
            </>
          )}
          <UnstyledButton fz={16} fw={400} css={{ color: '#999' }} onClick={ReplyWriteOnToggle}>
            답글쓰기
          </UnstyledButton>
        </div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          alreadyLike={comment.ALREADY_LIKE}
          likes={likes}
          count={Number(comment.LIKE_CNT)}
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default CommentCard;
