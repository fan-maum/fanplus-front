import { postLikes } from '@/api/Community';
import { Group, Stack, UnstyledButton } from '@/components/atoms';
import LikesButton from '@/components/atoms/LikesButton';
import CommentInfoState from '@/components/molecules/community/CommentInfoState';
import { CommunityCommentListItemType } from '@/types/community';
import axios from 'axios';

type CommentCardProps = {
  identity: string;
  comment: CommunityCommentListItemType;
};
const CommentCard = ({ identity, comment }: CommentCardProps) => {
  const LikesOnClick = async () => {
    // const res = await axios({
    //   url: `/https://napi.appphotocard.com/v1/likes/comment/${comment.COMMENT_IDX}`,
    //   method: 'post',
    //   data: {
    //     identity: identity
    //   }
    // })
    const res = await axios.post(`http://localhost:302/api/community/${comment.COMMENT_IDX}`,{identity: identity});
    console.log(res);
  }
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
          onClick={LikesOnClick}
        />
      </Group>
    </Stack>
  );
};

export default CommentCard;
