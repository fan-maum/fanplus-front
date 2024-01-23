import { getCommunityBoardData, getCommunityTypeBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { BoardLangType, UrlLangType } from '@/types/common';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import type { CommunityBoardMyPostResponseType, PartialUserType } from '@/types/community';
export interface MyPostPageProps {
  urlLang: UrlLangType;
  userId: string;
  communityMyPostData: CommunityBoardMyPostResponseType;
}

const MyPostPage = ({
  urlLang,
  userId,
  communityMyPostData,
  user,
}: MyPostPageProps & { user: PartialUserType }) => {
  // eslint-disable-next-line no-console
  console.log('communityMyPostData', communityMyPostData);

  return (
    <CommunityMainLayout urlLang={urlLang} user={user} withBestNotices>
      <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityMyPostData={communityMyPostData}
      />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = context.req.cookies.user_id || '';
  const user_idx = context.req.cookies.user_idx;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 1;
  const maxPage = 10;
  const topic = parseInt(context.query.topic as string) || 0;
  const boardType = 'myPost';

  const communityMyPostData = await getCommunityBoardData(
    userId,
    boardType,
    page,
    serverLang,
    boardLangCookie,
    view_type,
    topic,
    maxPage
  );

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { urlLang, userId: userId, communityMyPostData, user } };
  }
  return {
    props: {
      urlLang,
      userId: userId,
      communityMyPostData,
    },
  };
};

export default MyPostPage;
