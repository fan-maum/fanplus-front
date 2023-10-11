import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import { BoardLangType } from '@/types/common';
import { LangCookie } from '@/utils/setLangCookie';
import { urlLangToBackLang } from '@/hooks/useLanguage';

const Board = ({
  userId,
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityBoardTemplate
        userId={userId}
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        communityNoticeBannerData={communityNoticeBannerData}
        texts={CommunityBoardText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Omit<CommunityBoardPropType, 'texts'>> = async (
  context
) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const urlLang = (context.query.locale || 'en') as LangCookie;
  const backLang = urlLangToBackLang(urlLang);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    backLang,
    boardLangCookie,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, backLang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, backLang);

  return {
    props: {
      userId,
      boardLangCookie,
      communityBoardData,
      communityBoardTopics,
      communityNoticeBannerData,
    },
  };
};

export default Board;
