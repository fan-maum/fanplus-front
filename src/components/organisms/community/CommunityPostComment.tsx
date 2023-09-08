import { Group } from '@/components/atoms';
import PostCommentCount from '@/components/atoms/PostCommentCount';
import { CommunityPost_CommentListItemType } from '@/types/community';

type CommunityPostCommentProps = {
  commentList: Array<CommunityPost_CommentListItemType>;
};

const CommunityPostComment = ({ commentList }: CommunityPostCommentProps) => {
  // eslint-disable-next-line no-console
  console.log(commentList);
  return (
    <>
      <Group h={80}>
        <PostCommentCount count={commentList.length} />
        {/* <PostCommentOrders  direction={direction}
          setDirection={setDirection}/> */}
      </Group>
      {/* <div>
        <LabelCommentCount label={`댓글 ${commentCount}`} />
        {commentCount > 0 && (
          <ButtonCommentOrders direction={direction} setDirection={setDirection} />
        )}
      </div>
      <ScreenCommentList postID={postID} commentsOrderBy={commentsOrderBy} anonymity={anonymity} />
      <>
        <div>댓글입력 및 공유 Bottom Bar</div>;
        <FormComment variables={{ postID, commentsOrderBy }} anonymity={anonymity} />
        <>PostDetailMenuIconWrapper</>
      </> */}
    </>
  );
};

export default CommunityPostComment;
