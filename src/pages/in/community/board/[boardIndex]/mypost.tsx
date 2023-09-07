import { getCommunityBoardData } from '@/api/Community';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_IND, FooterText_IND, NavBarText_IND } from '@/texts/in';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate, {
  CommunityMyPostPropType,
} from '@/components/templates/CommunityMyPostTemplate';

const MyPost = ({ communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_IND} footerTexts={FooterText_IND}>
      <CommunityMyPostTemplate
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_IND}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const lang = 'id';
  const boardLang = 'ALL';
  const topic = '';
  const view_type = 'my_post';

  if (typeof boardIndex !== 'number') return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    lang,
    boardLang,
    topic,
    view_type
  );

  return { props: { communityBoardData } };
};

export default MyPost;
