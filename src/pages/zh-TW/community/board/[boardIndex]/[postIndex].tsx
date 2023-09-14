import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData, getCommunityUnAuthPostData } from '@/api/Community';
import { CommunityPostText_zh_TW, FooterText_zh_TW, NavBarText_zh_TW } from '@/texts/zh-TW';
import Layout from '@/components/organisms/Layout';
import { CommunityPostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({ identity, lang, communityPostData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <CommunityPostTemplate
        identity={identity}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_zh_TW}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: CommunityPostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'zhtw';

  const cookies = nookies.get(context);
  const identity = cookies.user_id;

  if (!boardIndex || !postIndex) return { notFound: true };

  let communityPostData;
  let communityPostCommentData;
  if (identity !== null) {
    communityPostData = await getCommunityPostData(postIndex, identity);
  } else {
    communityPostData = await getCommunityUnAuthPostData(boardIndex, postIndex, lang);
  }

  return {
    props: { identity, lang, communityPostData, communityPostCommentData },
  };
};

export default Post;
