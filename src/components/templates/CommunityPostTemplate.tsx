import { useRouter } from 'next/router';
import type { CommunityPostResponseType } from '@/types/community';
import type { CommunityPostTextType } from '@/types/textTypes';
import CommunityPostTopNavi from '@/components/molecules/community/CommunityPostTopNavi';
import CommunityPostInfo from '@/components/organisms/community/CommunityPostInfo';
import CommunityPostDetail from '@/components/organisms/community/CommunityPostDetail';

export type CommunityPostPropType = {
  communityPostData: CommunityPostResponseType;
  texts: CommunityPostTextType;
};

const CommunityPostTemplate = ({ communityPostData, texts }: CommunityPostPropType) => {
  const router = useRouter();
  const postInfo = communityPostData.RESULTS.DATAS.POST_INFO;
  const commentList = communityPostData.RESULTS.DATAS.COMMENT_LIST;
  const headList = communityPostData.RESULTS.DATAS.HEAD_LIST;
  console.log(postInfo);
  console.log(commentList);
  console.log(headList);
  return (
    <div
      css={{
        width: '100%',
        maxWidth: '768px',
        margin: '0px auto',
        position: 'relative',
      }}
    >
      <div>
        <CommunityPostTopNavi />
        <CommunityPostInfo postInfo={postInfo} />
        <CommunityPostDetail postInfo={postInfo} />
        <div>댓글</div>
        <div>댓글입력 및 공유 Bottom Bar</div>
      </div>
    </div>
  );
};

export default CommunityPostTemplate;
