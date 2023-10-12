import { getCommunityBoardData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate, {
  CommunityMyPostPropType,
} from '@/components/templates/CommunityMyPostTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import { CommunityBoardText_KR, FooterText_KR, NavBarText_KR } from '@/texts/ko';
import type { UrlLangType } from '@/types/common';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

const MyPost = ({ userId, communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityMyPostTemplate
        userId={userId}
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const urlLang = (context.query.locale || 'en') as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const boardLang = 'ALL';
  const topic = '';
  const view_type = 'my_post';

  if (typeof boardIndex !== 'number') return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    backLang,
    boardLang,
    topic,
    view_type
  );

  return { props: { userId, communityBoardData } };
};

export default MyPost;
