import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData, getCommunityUnAuthPostData } from '@/api/Community';
import { CommunityPostText_zh_CN, FooterText_zh_CN, NavBarText_zh_CN } from '@/texts/zh-CN';
import Layout from '@/components/organisms/Layout';
import { PostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';

const Post = ({ identity, postIndex, lang, communityPostData }: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <CommunityPostTemplate
        identity={identity}
        postIndex={postIndex}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_zh_CN}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: PostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'zh';

  const cookies = nookies.get(context);
  const identity = cookies.user_id;

  if (!boardIndex || !postIndex) return { notFound: true };

  let communityPostData;
  if (identity !== null) {
    communityPostData = await getCommunityPostData(postIndex, identity);
  } else {
    communityPostData = await getCommunityUnAuthPostData(boardIndex, postIndex, lang);
  }

  return {
    props: { identity, postIndex, lang, communityPostData },
  };
};

export default Post;