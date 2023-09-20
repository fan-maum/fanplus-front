import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData, getCommunityUnAuthPostData } from '@/api/Community';
import { CommunityPostText_JAP, FooterText_JAP, NavBarText_JAP } from '@/texts/ja';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({ identity, lang, communityPostData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <CommunityPostTemplate
        identity={identity}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_JAP}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'ja';

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
