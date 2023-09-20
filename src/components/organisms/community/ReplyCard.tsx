import { Group, Stack } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommentListItemType } from '@/types/community';
import { PurPoseType, TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { useLikesButtonOnClick } from '@/hooks/useLikesButtonOnClick';

export type ReplyCardProps = {
  identity: string;
  reply: CommentListItemType;
  texts: CommunityPostTextType;
  replyRefetch: () => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};
const ReplyCard = ({
  identity,
  reply,
  texts,
  replyRefetch,
  showReportModalBlockOnClick,
}: ReplyCardProps) => {
  const router = useRouter();
  const LikesOnClick = async () => await useLikesButtonOnClick({
    identity,
    comment: reply,
    refetchFunc: replyRefetch,
    router,
  });

  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState
        identity={identity}
        reply={reply}
        texts={texts}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
      <Group position="apart" ml={68}>
        <div></div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          alreadyLike={reply.ALREADY_LIKE}
          likesCount={Number(reply.LIKE_CNT)}
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default ReplyCard;
