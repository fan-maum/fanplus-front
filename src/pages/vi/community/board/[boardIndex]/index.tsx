import {
  getCommunityBoardData,
  getCommunityBoardTopics,
  getCommunityNoticeBannerData,
} from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_VIE, FooterText_VIE, NavBarText_VIE } from '@/texts/vi';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import { BoardLangType } from '@/types/common';

const Board = ({
  boardLangCookie,
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <CommunityBoardTemplate
        boardLangCookie={boardLangCookie}
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        communityNoticeBannerData={communityNoticeBannerData}
        texts={CommunityBoardText_VIE}
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
  const lang = 'vi';
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = (context.query.view as string) || 'all';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    lang,
    boardLangCookie,
    topic,
    view_type
  );
  const communityBoardTopics = await getCommunityBoardTopics(boardIndex, lang);
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, lang);

  return {
    props: {
      boardLangCookie,
      communityBoardData,
      communityBoardTopics,
      communityNoticeBannerData,
    },
  };
};

export default Board;
