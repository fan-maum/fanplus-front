import { getCommunityBoardData, getCommunityBoardTopics } from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { LangCookie } from '@/utils/setLangCookie';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_JAP, FooterText_JAP, NavBarText_JAP } from '@/texts/ja';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';

const Board = ({ communityBoardData, communityBoardTopics }: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <CommunityBoardTemplate
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        texts={CommunityBoardText_JAP}
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
  const lang = 'ja';
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
  const communityBoardTopics = await getCommunityBoardTopics(userIdforTopic, boardIndex);

  return {
    props: { communityBoardData, communityBoardTopics },
  };
};

export default Board;
