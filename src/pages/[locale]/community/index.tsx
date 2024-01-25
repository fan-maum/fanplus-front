import { getCommunityBoardData, getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardAllResponseType,
  CommunityBoardResponseType,
  PartialUserType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';

export interface CommunityBoardPropTypes {
  queryParams: {
    urlLang: UrlLangType;
    userId: string;
    isAdminAccount: boolean;
    boardLangCookie: BoardLangType;
    maxPage: number;
  };
  initialProps: {
    page: number;
    serverLang: ServerLangType;
    boardLangCookie: BoardLangType;
    topic: number;
    view_type: string;
  };
}

export interface CommunityBoardAllPropTypes {
  communityHomeSSRdata: CommunityBoardAllResponseType;
  communityBestBoardSSRdata: CommunityBoardResponseType;
}

const CommunityHomePage = ({
  user,
  queryParams,
  communityHomeSSRdata,
  communityBestBoardSSRdata,
  initialProps,
}: CommunityBoardPropTypes & { user: PartialUserType } & CommunityBoardAllPropTypes) => {
  const { urlLang } = queryParams;
  const router = useRouter();
  const texts = communityMainPageTexts[urlLang];
  const tabBarState = useState((router.query.tab as string) || 'community');
  const searchTabState = useState(texts.boardMain);

  return (
    <CommunityMainLayout
      urlLang={urlLang}
      user={user}
      withSearchInput
      tabBarState={tabBarState}
      searchTabState={searchTabState}
    >
      <CommunityPageTemplate
        queryParams={queryParams}
        communityHomeSSRdata={communityHomeSSRdata}
        communityBestBoardSSRdata={communityBestBoardSSRdata}
        initialProps={initialProps}
        tabBarState={tabBarState}
        searchTabState={searchTabState}
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
  const HomeBoardType = 'community';
  const BestBoardType = 2291;

  const communityHomeSSRdata: CommunityBoardAllResponseType = await getCommunityBoardData(
    userId,
    HomeBoardType,
    page,
    serverLang,
    boardLangCookie,
    view_type,
    topic,
    maxPage
  );

  const communityBestBoardSSRdata: CommunityBoardResponseType = await getCommunityBoardData(
    userId,
    BestBoardType,
    page,
    serverLang,
    boardLangCookie,
    view_type,
    topic,
    maxPage
  );

  const queryParams = { urlLang, userId, isAdminAccount, boardLangCookie, maxPage };
  const initialProps = { page, serverLang, boardLangCookie, view_type, topic };

  const props = {
    queryParams,
    communityHomeSSRdata,
    communityBestBoardSSRdata,
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
