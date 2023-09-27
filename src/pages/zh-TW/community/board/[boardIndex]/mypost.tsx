import { getCommunityBoardData } from '@/api/Community';
import { GetServerSideProps } from 'next';
import { CommunityBoardText_zh_TW, FooterText_zh_TW, NavBarText_zh_TW } from '@/texts/zh-TW';
import nookies from 'nookies';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate, {
  CommunityMyPostPropType,
} from '@/components/templates/CommunityMyPostTemplate';

const MyPost = ({ userId, communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <CommunityMyPostTemplate
        userId={userId}
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_zh_TW}
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
  const lang = 'zhtw';
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

  return { props: { userId, communityBoardData } };
};

export default MyPost;
