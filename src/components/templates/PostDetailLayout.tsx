import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import { PostInfoItemType } from '@/types/community';
import { CommunityPostTextType } from '@/types/textTypes';

export type PostDetailLayoutProps = {
  identity: string;
  postInfo: PostInfoItemType;
  texts: CommunityPostTextType;
  deletePostOnClick: () => void;
};

const PostDetailLayout = ({
  identity,
  postInfo,
  texts,
  deletePostOnClick,
}: PostDetailLayoutProps) => {
  return (
    <>
      <CommunityPostTopNavi texts={texts} deletePostOnClick={deletePostOnClick} />
      <CommunityPostInfo postInfo={postInfo} texts={texts} />
      <CommunityPostDetail identity={identity} postInfo={postInfo} texts={texts} />
    </>
  );
};

export default PostDetailLayout;
