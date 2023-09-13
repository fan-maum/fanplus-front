import { useState } from 'react';
import { deleteLikes, postLikes } from '@/api/Community';
import { Group, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommunityCommentListItemType, CommunityPost_CommentListItemType} from '@/types/community';

export type ReplyCardProps = {
  identity: string;
  reply: CommunityCommentListItemType;
};
const ReplyCard = ({ identity, reply }: ReplyCardProps) => {
  const [likes, setLikes] = useState(false);
  const LikesOnClick = async () => {
    if (reply.ALREADY_LIKE === 'Y' || likes === true) {
      const res = await deleteLikes(reply.COMMENT_IDX, identity);
      setLikes(false);
    } else {
      const res = await postLikes(reply.COMMENT_IDX, identity);
      setLikes(true);
    }
  };
  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState identity={identity} reply={reply} />
      <Group position="apart" ml={68}>
        <div></div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          alreadyLike={reply.ALREADY_LIKE}
          likes={likes}
          count={Number(reply.LIKE_CNT)}
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default ReplyCard;
