import { getBookmarks, getCommunityPostData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPostTemplate from '@/components/templates/CommunityPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type { BookmarksResponseType, PostResponseType } from '@/types/community';
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

export interface bookmarksPostProps extends CommunityPostPropType {
  bookmarksData: BookmarksResponseType;
}

const Post = ({
  urlLang,
  identity,
  user_idx,
  postIndex,
  serverLang,
  communityPostData,
  bookmarksData,
}: bookmarksPostProps) => {
  return (
    <CommunityMainLayout urlLang={urlLang} bookmarksData={bookmarksData}>
      <CommunityPostTemplate
        urlLang={urlLang}
        identity={identity}
        user_idx={user_idx}
        postIndex={postIndex}
        serverLang={serverLang}
        communityPostData={communityPostData}
      />
    </CommunityMainLayout>
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
  if (communityPostData.RESULTS.DATAS.POST_INFO.IS_PUBLISH === 'N') return { notFound: true };

  let bookmarksData;
  if (identity === null) {
    bookmarksData = { SUBSCRIPTION_BOARDS: [] };
  } else {
    bookmarksData = await getBookmarks(identity, 'ko_KR');
  }

  return {
    props: { urlLang, identity, user_idx, postIndex, serverLang, communityPostData, bookmarksData },
  };
};

export default Post;
