import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData, getCommunityUnAuthPostData } from '@/api/Community';
import { CommunityPostText_VIE, FooterText_VIE, NavBarText_VIE } from '@/texts/vi';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({ identity, lang, communityPostData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <CommunityPostTemplate
        identity={identity}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_VIE}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'vi';

  const cookies = nookies.get(context);
  const identity = cookies.user_id || null;

  if (!boardIndex || !postIndex) return { notFound: true };

  let communityPostData;
  if (identity !== null) {
    communityPostData = await getCommunityPostData(postIndex, identity);
  } else {
    communityPostData = await getCommunityUnAuthPostData(boardIndex, postIndex, lang);
  }

  return {
    props: { identity, lang, communityPostData },
  };
};

export default Post;
