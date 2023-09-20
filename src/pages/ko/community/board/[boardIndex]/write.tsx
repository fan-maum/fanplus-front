import { getCommunityBoardTopics, postBoardArticle } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { CommunityPostEditorText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import { BackLangType, BoardLangType } from '@/types/common';
import { CommunityBoardTopicResponseType } from '@/types/community';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  boardTopics: CommunityBoardTopicResponseType;
  datas: {
    userId: string;
    boardIndex: number;
    postIndex: number;
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

export const getServerSideProps: GetServerSideProps<CommunityPostWritePropType> = async (
  context
) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const boardLangCookie = cookies['boardLang'] as BoardLangType;

  const boardIndex = parseInt(context.query.boardIndex as string);
  const lang: BackLangType = 'ko';
  const boardLang: BackLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : lang;

  const boardTopics = await getCommunityBoardTopics(boardIndex, lang);
  const initBoardArticle = await postBoardArticle(userId, boardIndex, boardLang, lang);
  const postIndex = parseInt(initBoardArticle.RESULTS.DATAS.POST_IDX);
  const datas = { userId, boardIndex, postIndex, boardLang, lang };
  return {
    props: { boardTopics, datas },
  };
};

export default Write;
