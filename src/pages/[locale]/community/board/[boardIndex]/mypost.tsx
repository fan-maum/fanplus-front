import { getCommunityBoardData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityMyPostPropType = {
  urlLang: UrlLangType;
  userId: string | null;
  communityBoardData: CommunityBoardResponseType;
};

const MyPost = ({ urlLang, userId, communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout urlLang={urlLang}>
      {/* <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityBoardData={communityBoardData}
      /> */}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const boardIndex = parseInt(context.query.boardIndex as string);
  const page = parseInt(context.query.page as string) - 1 || 0;
  const boardLang = 'ALL';
  const topic = '';
  const viewType = 'my_post';

  if (typeof boardIndex !== 'number') return { notFound: true };

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
