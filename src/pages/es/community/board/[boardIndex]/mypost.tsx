import { getCommunityBoardData } from '@/api/Community';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_ESP, FooterText_ESP, NavBarText_ESP } from '@/texts/es';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate, {
  CommunityMyPostPropType,
} from '@/components/templates/CommunityMyPostTemplate';

const MyPost = ({ communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_ESP} footerTexts={FooterText_ESP}>
      <CommunityMyPostTemplate
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_ESP}
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
  const lang = 'es';
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
