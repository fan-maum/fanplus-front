import { getCommunityBoardData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';

export type CommunityMyPostPropType = {
  urlLang: UrlLangType;
  userId: string | null;
  communityBoardData: CommunityBoardResponseType;
};

const MyPost = ({ urlLang, userId, communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityBoardData={communityBoardData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = Number(context.query.boardIndex);
  const page = Number(context.query.page) - 1 || 0;
  const topic = '';
  const boardLang = 'ALL';
  const viewType = 'my_post';

  const cookies = context.req.cookies;
  const userId = cookies.user_id || null;

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLang,
    topic,
    viewType
  );

  return { props: { urlLang, userId, communityBoardData } };
};

export default MyPost;
