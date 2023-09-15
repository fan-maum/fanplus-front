import { getCommunityBoardTopics } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import PostEditorTemplate from '@/components/templates/PostEditorTemplate';
import { FooterText_KR, NavBarText_KR } from '@/texts/ko';
import { CommunityBoardTopicResponseType } from '@/types/community';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

type CommunityPostWritePropType = {
  boardTopics: CommunityBoardTopicResponseType;
};

const Write = ({ boardTopics }: CommunityPostWritePropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <PostEditorTemplate topics={boardTopics.RESULTS.DATAS.TOPIC_LIST} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<CommunityPostWritePropType> = async (
  context
) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];

  const boardIndex = parseInt(context.query.boardIndex as string);
  const lang = 'ko';

  const boardTopics = await getCommunityBoardTopics(boardIndex, lang);
  return {
    props: { boardTopics },
  };
};

export default Write;
