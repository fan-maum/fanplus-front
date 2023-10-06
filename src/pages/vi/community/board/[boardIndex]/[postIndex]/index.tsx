import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData } from '@/api/Community';
import { CommunityPostText_VIE, FooterText_VIE, NavBarText_VIE } from '@/texts/vi';
import Layout from '@/components/organisms/Layout';
import { PostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({
  identity,
  user_idx,
  postIndex,
  lang,
  communityPostData,
}: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <CommunityPostTemplate
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_VIE}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: PostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'vi';

  const cookies = nookies.get(context);
  const identity: any = cookies.user_id || null;
  const user_idx = cookies.user_idx || null;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, identity, lang);

  return {
    props: { identity, user_idx, postIndex, lang, communityPostData },
  };
};

export default Post;
