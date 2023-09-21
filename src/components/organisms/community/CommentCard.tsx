import { Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommentListItemType } from '@/types/community';
import IconReply from '@/components/atoms/IconReply';
import { PurPoseType, TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { useLikesButtonOnClick } from '@/hooks/useLikesButtonOnClick';

export type CommentCardProps = {
  identity: string;
  comment: CommentListItemType;
  texts: CommunityPostTextType;
  refetch: () => void;
  ReplyOnToggle?: (comment_idx: any) => void;
  ReplyWriteOnToggle?: () => void;
  showReportModalBlockOnClick: (purpose: PurPoseType, target_type: TargetType, idx: string) => void;
};
const CommentCard = ({
  identity,
  comment,
  texts,
  refetch,
  ReplyOnToggle,
  ReplyWriteOnToggle,
  showReportModalBlockOnClick,
}: CommentCardProps) => {
  const router = useRouter();
  const LikesOnClick = async () =>
    await useLikesButtonOnClick({
      identity,
      comment: comment,
      refetchFunc: refetch,
      router,
    });

  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState
        identity={identity}
        comment={comment}
        texts={texts}
        showReportModalBlockOnClick={showReportModalBlockOnClick}
      />
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
                {texts.reply} {comment.RE_COMMENT_CNT}
                <IconReply />
              </UnstyledButton>
            </>
          )}
          <UnstyledButton fz={16} fw={400} css={{ color: '#999' }} onClick={ReplyWriteOnToggle}>
            {texts.writeReply}
          </UnstyledButton>
        </div>
        <LikesButton
          buttonSize="medium"
          padding="0"
          alreadyLike={comment.ALREADY_LIKE}
          likesCount={Number(comment.LIKE_CNT)}
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default CommentCard;
