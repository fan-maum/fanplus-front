import { Stack } from '@/components/atoms';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommunityCommentListItemType } from '@/types/community';

type CommentCardProps = {
  comment: CommunityCommentListItemType;
};

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Stack p={'26px 20px 20px 20px'}>
      <CommentInfoState comment={comment} />
      <>답글쓰기</>
    </Stack>
  );
};

export default CommentCard;
