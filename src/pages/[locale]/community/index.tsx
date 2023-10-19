import { getCommunityBoardCategoryData, getCommunityHomeData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { getBoardResultQuery } from '@/server/query';
import type { UrlLangType } from '@/types/common';
import type { BoardListItemType, CommunityBoardCategoryResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { QueryClient, dehydrate } from 'react-query';

export type CommunityHomeDataType = {
  recommendList: BoardListItemType[];
  recentlyList: BoardListItemType[];
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  communityHomeData: CommunityHomeDataType;
  boardCategoryData: CommunityBoardCategoryResponseType;
};

const CommunityHomePage = ({
  urlLang,
  communityHomeData,
  boardCategoryData,
}: CommunityPropTypes) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPageTemplate
        urlLang={urlLang}
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;
  const queryClient = new QueryClient();

  const communityHomeData = await getCommunityHomeData(userId, serverLang);
  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultQueryFn = await getBoardResultQuery({
    category_type,
    searchValue,
    serverLang,
    page,
    per_page,
  });
  await queryClient.prefetchQuery(
    [
      'boardResults',
      {
        category_type,
        searchValue,
        serverLang,
        page,
        per_page,
      },
    ],
    () => boardResultQueryFn
  );

  return {
    props: {
      urlLang,
      communityHomeData,
      boardCategoryData,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CommunityHomePage;
