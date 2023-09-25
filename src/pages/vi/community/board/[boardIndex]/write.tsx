import { getCommunityBoardTopics, postBoardArticle } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { CommunityPostEditorText_VIE, FooterText_VIE, NavBarText_VIE } from '@/texts/vi';
import { BackLangType, BoardLangType } from '@/types/common';
import { CommunityBoardTopicResponseType } from '@/types/community';
import { GetServerSideProps } from 'next';
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
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <PostEditorTemplate
        mode="CREATE"
        topics={boardTopics.RESULTS.DATAS.TOPIC_LIST}
        texts={CommunityPostEditorText_VIE}
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
  const lang: BackLangType = 'vi';
  const boardLang: BackLangType =
    boardLangCookie && boardLangCookie !== 'ALL' ? boardLangCookie : lang;

  const boardTopics = await getCommunityBoardTopics(boardIndex, lang);
  const datas = { userId, boardIndex, boardLang, lang };
  return {
    props: { boardTopics, datas },
  };
};

export default Write;