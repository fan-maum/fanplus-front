import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { LangCookie } from '@/utils/setLangCookie';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import { BoardLangType } from '@/types/common';

const Board = ({
  cookieBoardLang,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityBoardTemplate
        cookieBoardLang={cookieBoardLang}
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
  const cookieBoardLang = (cookies['boardLang'] as BoardLangType) || 'ALL';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = 'ko';
  const boardLang = translateFrontLangToBackLang(context.query.boardLang as LangCookie) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    lang,
    boardLang,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, lang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, lang);

  return {
    props: { cookieBoardLang, communityBoardData, communityBoardTopics, communityNoticeBannerData },
  };
};

export default Board;
