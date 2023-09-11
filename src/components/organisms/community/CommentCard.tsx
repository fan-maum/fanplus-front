import { Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommunityCommentListItemType } from '@/types/community';

type CommentCardProps = {
  comment: CommunityCommentListItemType;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Stack p={'26px 20px 20px 20px'} spacing={18}>
      <CommentInfoState comment={comment} />
      <Group position="apart" ml={68}>
        <UnstyledButton fz={16} fw={400} css={{ color: '#999' }}>
          답글쓰기
        </UnstyledButton>
        <LikesButton
          buttonSize="medium"
          padding="0"
          text={`${comment.LIKE_CNT}`}
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('clicked');
          }}
        />
      </Group>
    </Stack>
  );
};

export default CommentCard;
