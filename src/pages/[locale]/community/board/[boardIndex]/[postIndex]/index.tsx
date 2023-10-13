import { getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPostTemplate from '@/components/templates/CommunityPostTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import type { BackLangType, UrlLangType } from '@/types/common';
import type { PostResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityPostPropType = {
  urlLang: UrlLangType;
  identity: string;
  user_idx: string;
  postIndex: number;
  lang: BackLangType;
  communityPostData: PostResponseType;
};

const Post = ({
  urlLang,
  identity,
  user_idx,
  postIndex,
  lang,
  communityPostData,
}: CommunityPostPropType & { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPostTemplate
        urlLang={urlLang}
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        lang={lang}
        communityPostData={communityPostData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);

  const cookies = nookies.get(context);
  const identity: any = cookies.user_id || null;
  const user_idx = cookies.user_idx || null;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, identity, backLang);

  return {
    props: { urlLang, identity, user_idx, postIndex, lang: backLang, communityPostData },
  };
};

export default Post;
