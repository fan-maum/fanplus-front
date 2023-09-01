import { getCommunityBoardData, getCommunityBoardTopics } from '@/api/Community';
import CommunityBoardTemplate, {
  CommunityBoardPropType,
} from '@/components/templates/CommunityBoardTemplate';
import { translateFrontLangToBackLang } from '@/hooks/useLanguage';
import { LangCookie } from '@/utils/setLangCookie';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import { CommunityBoardText_zh_TW, FooterText_zh_TW, NavBarText_zh_TW } from '@/texts/zh-TW';

const Board = ({ communityBoardData, communityBoardTopics }: CommunityBoardPropType) => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <CommunityBoardTemplate
        communityBoardData={communityBoardData}
        communityBoardTopics={communityBoardTopics}
        stringTopicAll={CommunityBoardText_zh_TW.all}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityBoardPropType, 'stringTopicAll'>
> = async (context) => {
  // const cookies = nookies.get(context);
  // const userId = cookies['user_id'];
  const userId = '008badb6f4296505f6741654eb98d11f324b4dc5f2ee396a5f68e6c18d4872ab';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = translateFrontLangToBackLang(context.req.url?.split('/')[1] as LangCookie);
  const boardLang = translateFrontLangToBackLang(context.query.boardLang as LangCookie) || lang;
  const topic = parseInt(context.query.topic as string) || '';

  if (!boardIndex) return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    lang,
    boardLang,
    topic
  );
  const communityBoardTopics = await getCommunityBoardTopics(userId, boardIndex);

  return {
    props: { communityBoardData, communityBoardTopics },
  };
};

export default Board;
