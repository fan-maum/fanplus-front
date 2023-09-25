import { useState } from 'react';
import { deleteLikes, postLikes } from '@/api/Community';
import { Group, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommentListItemType } from '@/types/community';
import { PurPoseType, TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { gotoLogin } from '@/utils/gotoLogin';

export type ReplyCardProps = {
  identity: string;
  reply: CommentListItemType;
  texts: CommunityPostTextType;
  showModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};
const ReplyCard = ({
  identity,
  reply,
  texts,
  showModalBlockOnClick,
  showReportModalBlockOnClick,
}: ReplyCardProps) => {
  const router = useRouter();
  const [likes, setLikes] = useState(reply.ALREADY_LIKE);
  const [count, setCount] = useState<number>(parseInt(reply.LIKE_CNT as string));

  const LikesOnClick = async () => {
    if (identity !== null) {
      if (likes === 'Y') {
        await deleteLikes(reply.COMMENT_IDX, identity);
        setLikes('N');
        setCount((prev) => prev - 1);
      } else {
        await postLikes(reply.COMMENT_IDX, identity);
        setLikes('Y');
        setCount((prev) => prev + 1);
      }
    } else {
      gotoLogin(router);
    }
  };
  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState
        identity={identity}
        reply={reply}
        texts={texts}
        showModalBlockOnClick={showModalBlockOnClick}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
      <Group position="apart" ml={68}>
        <div></div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          alreadyLike={likes}
          likesCount={count}
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default ReplyCard;
