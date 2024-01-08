import { getCommunityTypeBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { BoardLangType, UrlLangType } from '@/types/common';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import type { CommunityMyPostResponseType, PartialUserType } from '@/types/community';
export interface MyPostPageProps {
  urlLang: UrlLangType;
  userId: string;
  communityMyPostData: CommunityMyPostResponseType;
}

const MyPostPage = ({
  urlLang,
  user,
  userId,
  communityMyPostData,
}: MyPostPageProps & { user: PartialUserType }) => {
  return (
    <CommunityMainLayout urlLang={urlLang} user={user}>
      <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityMyPostData={communityMyPostData}
      />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const cookies = nookies.get(context);
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const view_type = (context.query.view as string) || 'all';
  const page = parseInt(context.query.page as string) - 1 || 1;
  const user_id = context.req.cookies.user_id || '';
  const user_idx = context.req.cookies.user_idx;
  const topic = parseInt(context.query.topic as string) || 0;
  const boardType = 'myPost';
  const maxPage = 1000000;

  const communityMyPostData = await getCommunityTypeBoardData(
    user_id,
    boardType,
    page,
    maxPage,
    serverLang,
    boardLangCookie,
    view_type
  );

  if (!!user_id && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(user_id, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { urlLang, userId: user_id, communityMyPostData, user } };
  }
  return {
    props: {
      urlLang,
      userId: user_id,
      communityMyPostData,
    },
  };
};

export default MyPostPage;
