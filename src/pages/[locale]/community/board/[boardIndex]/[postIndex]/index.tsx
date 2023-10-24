import { getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPostTemplate from '@/components/templates/CommunityPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type { PostResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityPostPropType = {
  urlLang: UrlLangType;
  identity: string;
  user_idx: string;
  postIndex: number;
  serverLang: ServerLangType;
  communityPostData: PostResponseType;
};

const Post = ({
  urlLang,
  identity,
  user_idx,
  postIndex,
  serverLang,
  communityPostData,
}: CommunityPostPropType) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPostTemplate
        urlLang={urlLang}
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        serverLang={serverLang}
        communityPostData={communityPostData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);

  const cookies = nookies.get(context);
  const identity: any = cookies.user_id || null;
  const user_idx = cookies.user_idx || null;

  if (!boardIndex || !postIndex) return { notFound: true };

  const communityPostData = await getCommunityPostData(boardIndex, postIndex, identity, serverLang);

  return {
    props: { urlLang, identity, user_idx, postIndex, serverLang, communityPostData },
  };
};

export default Post;
