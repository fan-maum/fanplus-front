import { getCommunityBoardData, getCommunityBoardTopics } from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { LangCookie } from '@/utils/setLangCookie';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_ESP, FooterText_ESP, NavBarText_ESP } from '@/texts/es';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';

const MyPost = ({ communityBoardData, communityBoardTopics }: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <CommunityBoardTemplate
        isMyPostPage
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        texts={CommunityBoardText_ESP}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<Omit<CommunityBoardPropType, 'texts'>> = async (
  context
) => {
  // const cookies = nookies.get(context);
  // const userId = cookies['user_id'];
  const userId = '1a11a56286d1c02c5eb4f38b6d6fa0f5d2db490e0783d70f1b0db7746c96d1cc';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = 'es';
  const boardLang = translateFrontLangToBackLang(context.query.boardLang as LangCookie) || 'ALL';
  const topic = parseInt(context.query.topic as string) || '';
  const view_type = 'my_post';

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
  const communityBoardTopics = await getCommunityBoardTopics(userId, boardIndex);

  return {
    props: { communityBoardData, communityBoardTopics },
  };
};

export default MyPost;