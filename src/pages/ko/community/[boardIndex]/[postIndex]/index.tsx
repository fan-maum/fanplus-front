import { GetServerSideProps } from 'next';
import { getCommunityPostData } from '@/api/Community';
import { CommunityPostText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({ communityPostData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityPostTemplate communityPostData={communityPostData} texts={CommunityPostText_KR} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'ko';

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, lang);

  return {
    props: { communityPostData },
  };
};

export default Post;
