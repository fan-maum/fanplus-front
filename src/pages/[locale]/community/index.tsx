import { getCommunityTypeBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type { CommunityMainPageResponseType, PartialUserType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  userId: string;
  isAdminAccount: boolean;
  boardLangCookie: BoardLangType;
  communityMainBoardData: CommunityMainPageResponseType;
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    maxPage: number;
    view_type: string;
  };
};

const CommunityHomePage = ({
  urlLang,
  userId,
  isAdminAccount,
  boardLangCookie,
  communityMainBoardData,
  initialProps,
  user,
}: CommunityPropTypes & { user: PartialUserType }) => {
  return (
    <CommunityMainLayout urlLang={urlLang} user={user} withSearchInput>
      <CommunityPageTemplate
        urlLang={urlLang}
        userId={userId}
        isAdminAccount={isAdminAccount}
        boardLangCookie={boardLangCookie}
        communityMainBoardData={communityMainBoardData}
        initialProps={initialProps}
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
  const isAdminAccount = user_idx === process.env.ADMIN_ACCOUNT_IDX;

  const communityMainBoardData: CommunityMainPageResponseType = await getCommunityTypeBoardData(
    userId,
    'community',
    page,
    maxPage,
    serverLang,
    boardLangCookie,
    view_type
  );

  const initialProps = { page, serverLang, boardLangCookie, maxPage, view_type };
  const props = {
    urlLang,
    userId,
    isAdminAccount,
    boardLangCookie,
    communityMainBoardData,
    initialProps,
  };

  if (!!userId && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(userId, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { ...props, user } };
  }

  return { props };
};

export default CommunityHomePage;
