import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData, getCommunityUnAuthPostData } from '@/api/Community';
import { CommunityPostText_ESP, FooterText_ESP, NavBarText_ESP } from '@/texts/es';
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
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <CommunityPostTemplate
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_ESP}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: PostResponseType;
}> = async (context) => {
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);
  const lang = 'es';

  const cookies = nookies.get(context);
  const identity = cookies.user_id;
  const user_idx = cookies.user_idx;

  if (!boardIndex || !postIndex) return { notFound: true };

  let communityPostData;
  if (identity !== null) {
    communityPostData = await getCommunityPostData(postIndex, identity);
  } else {
    communityPostData = await getCommunityUnAuthPostData(boardIndex, postIndex, lang);
  }

  return {
    props: { identity, user_idx, postIndex, lang, communityPostData },
  };
};

export default Post;
