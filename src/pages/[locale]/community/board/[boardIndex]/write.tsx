import { getCommunityBoardTopics } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type { CommunityBoardTopicResponseType } from '@/types/community';
import { noUserIdHandler } from '@/utils/loginError';
import type { GetServerSidePropsContext } from 'next';

type CommunityPostWritePropType = {
  urlLang: UrlLangType;
  boardTopics: CommunityBoardTopicResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    serverLang: ServerLangType;
  };
};

const Write = ({ urlLang, boardTopics, datas }: CommunityPostWritePropType) => {
  return (
    <Layout urlLang={urlLang}>
      <PostEditorTemplate
        mode="CREATE"
        urlLang={urlLang}
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        datas={datas}
      />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = Number(context.query.boardIndex);

  const cookies = context.req.cookies;
  const userId = cookies.user_id || null;

  if (!userId) {
    return noUserIdHandler(urlLang, `/community/board/${boardIndex}/write/`);
  }

  const datas = { userId, boardIndex, serverLang };

  const boardTopics = await getCommunityBoardTopics(boardIndex, serverLang);

  return {
    props: { urlLang, datas, boardTopics },
  };
};

export default Write;
