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
import { CommunityBoardText_zh_CN, FooterText_zh_CN, NavBarText_zh_CN } from '@/texts/zh-CN';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';

const Board = ({
  communityBoardData,
  communityBoardTopics,
  communityNoticeBannerData,
}: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <CommunityBoardTemplate
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        communityNoticeBannerData={communityNoticeBannerData}
        texts={CommunityBoardText_zh_CN}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Omit<CommunityBoardPropType, 'texts'>> = async (
  context
) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const userIdforTopic = '1a11a56286d1c02c5eb4f38b6d6fa0f5d2db490e0783d70f1b0db7746c96d1cc';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = 'zh';
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
  const communityNoticeBannerData = await getCommunityNoticeBannerData(boardIndex, userIdforTopic);

  return {
    props: { communityBoardData, communityBoardTopics, communityNoticeBannerData },
  };
};

export default Board;
