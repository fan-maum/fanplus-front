import { getCommunityBoardTopics } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import { CommunityPostEditorText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import type { BackLangType, BoardLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardTopicResponseType } from '@/types/community';
import { noUserIdHandler } from '@/utils/loginError';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  boardTopics: CommunityBoardTopicResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    boardLang: BackLangType;
    lang: BackLangType;
  };
};

const Write = ({ boardTopics, datas }: CommunityPostWritePropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <PostEditorTemplate
        mode="CREATE"
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        texts={CommunityPostEditorText_KR}
        datas={datas}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const boardLangCookie = cookies['boardLang'] as BoardLangType;

  const urlLang = (context.query.locale || 'en') as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const boardLang: BackLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : backLang;

  if (!userId) return noUserIdHandler('ko', `/community/board/${boardIndex}/write/`);

  const boardTopics = await getCommunityBoardTopics(boardIndex, backLang);
  const datas = { userId, boardIndex, boardLang, lang: backLang };
  return {
    props: { boardTopics, datas },
  };
};

export default Write;
