import { getCommunityBoardData, getCommunityBoardTopics } from '@/api/Community';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_JAP, FooterText_JAP, NavBarText_JAP } from '@/texts/ja';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate, {
  CommunityMyPostPropType,
} from '@/components/templates/CommunityMyPostTemplate';

const MyPost = ({ communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <CommunityMyPostTemplate
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_JAP}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  // const cookies = nookies.get(context);
  // const userId = cookies['user_id'];
  const userId = '1a11a56286d1c02c5eb4f38b6d6fa0f5d2db490e0783d70f1b0db7746c96d1cc';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = 'ja';
  const boardLang = 'ALL';
  const topic = '';
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
