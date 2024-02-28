import { getBookmarks, getCommunityPostData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPostTemplate from '@/components/templates/CommunityPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { PartialUserType, PostResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useQuery } from 'react-query';

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
  boardLangCookie,
  communityPostData,
  user,
}: CommunityPostPropType & { user: PartialUserType } & { boardLangCookie: BoardLangType }) => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_CLIENT_URL + router.asPath;
  const { data } = useQuery(['bookmarks', { userId: identity, urlLang }], () =>
    getBookmarks(identity, urlLang)
  );
  const bookmarks = data ?? [];

  return (
    <>
      <NextSeo
        title={communityPostData.RESULTS.DATAS.POST_INFO.POST_TITLE}
        description={communityPostData.RESULTS.DATAS.POST_INFO.POST_CONTENTS}
        canonical={url}
        openGraph={{
          title: communityPostData.RESULTS.DATAS.POST_INFO.POST_TITLE,
          type: 'website',
          url: url,
          siteName: '팬플러스(fanPlus)',
          description: communityPostData.RESULTS.DATAS.POST_INFO.POST_CONTENTS,
          images: [{ url: communityPostData.RESULTS.DATAS.POST_INFO.SUMNAIL_IMG }],
        }}
      />
      <CommunityMainLayout
        urlLang={urlLang}
        boardLangCookie={boardLangCookie}
        user={user}
        bookmarks={bookmarks}
        withBestNotices
        withBoardTab
      >
        <CommunityPostTemplate
          urlLang={urlLang}
          identity={identity}
          user_idx={user_idx}
          postIndex={postIndex}
          serverLang={serverLang}
          communityPostData={communityPostData}
        />
      </CommunityMainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const postIndex = parseInt(context.query.postIndex as string);

  const cookies = nookies.get(context);
  const identity: any = cookies.user_id || null;
  const user_idx = context.req.cookies.user_idx || null;
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';

  if (!boardIndex || !postIndex) return { notFound: true };
  try {
    const communityPostData = await getCommunityPostData(
      boardIndex,
      postIndex,
      identity,
      serverLang
    );

    const props = {
      urlLang,
      identity,
      user_idx,
      postIndex,
      serverLang,
      boardLangCookie,
      communityPostData,
    };

    if (!!identity && !!user_idx) {
      const { NICK, PROFILE_IMG_URL } = (await getUser(identity, user_idx)).RESULTS.DATAS;
      const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
      return { props: { ...props, user } };
    }

    return { props };
  } catch (error) {
    return { redirect: { destination: `/${urlLang}/community` }, props: {} };
  }
};

export default Post;
