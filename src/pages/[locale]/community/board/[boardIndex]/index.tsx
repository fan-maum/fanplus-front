import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityBoardTemplate from '@/components/templates/CommunityBoardTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import {
  useGetCommunityBoardDataQuery,
  useGetCommunityBoardDataQueryPropType,
} from '@/server/useGetCommunityBoardDataQuery';
import type { BoardLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardResponseType,
  CommunityBoardTopicResponseType,
  CommunityNoticeBannerResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export type CommunityBoardPropType = {
  urlLang: UrlLangType;
  userId: string | null;
  boardLangCookie: BoardLangType;
  communityBoardData: CommunityBoardResponseType;
  communityBoardTopics: CommunityBoardTopicResponseType;
  communityNoticeBannerData: CommunityNoticeBannerResponseType;
};

const Board = ({
  urlLang,
  userId,
  boardLangCookie,
  communityBoardData: communityBoardDataSSR,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  const router = useRouter();
  const useGetCommunityBoardDataQueryProps: useGetCommunityBoardDataQueryPropType = {
    userId: userId || '',
    boardIndex: Number(router.query.boardIndex),
    page: Number(router.query.page) - 1 || 0,
    lang: translateUrlLangToServerLang(urlLang),
    boardLang: boardLangCookie,
    topic: Number(router.query.topic) || 0,
    viewType: (router.query.view as string) || 'all',
    initialData: communityBoardDataSSR,
  };
  const {
    data: communityBoardData,
    isFetching,
    refetch,
  } = useGetCommunityBoardDataQuery(useGetCommunityBoardDataQueryProps);

  return (
    <Layout urlLang={urlLang}>
      <CommunityBoardTemplate
        urlLang={urlLang}
        userId={userId}
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData || communityBoardDataSSR}
        communityBoardTopics={communityBoardTopics}
        communityNoticeBannerData={communityNoticeBannerData}
        isFetching={isFetching}
        refetch={refetch}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLangCookie,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, serverLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, serverLang);

  return {
    props: {
      urlLang,
      userId,
      boardLangCookie,
      communityBoardData,
      communityBoardTopics,
      communityNoticeBannerData,
    },
  };
};

export default Board;
