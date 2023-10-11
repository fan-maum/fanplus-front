import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getCommunityPostData } from '@/api/Community';
import { CommunityPostText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import Layout from '@/components/organisms/Layout';
import { PostResponseType } from '@/types/community';
import CommunityPostTemplate, {
  CommunityPostPropType,
} from '@/components/templates/CommunityPostTemplate';
import { LangCookie } from '@/utils/setLangCookie';
import { urlLangToBackLang } from '@/hooks/useLanguage';

const Post = ({
  identity,
  user_idx,
  postIndex,
  lang,
  communityPostData,
}: CommunityPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityPostTemplate
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        lang={lang}
        communityPostData={communityPostData}
        texts={CommunityPostText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityPostData: PostResponseType;
}> = async (context) => {
  const urlLang = (context.query.locale || 'en') as LangCookie;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);

  const cookies = nookies.get(context);
  const identity: any = cookies.user_id || null;
  const user_idx = cookies.user_idx || null;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, identity, backLang);

  return {
    props: { identity, user_idx, postIndex, lang: backLang, communityPostData },
  };
};

export default Post;
