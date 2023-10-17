import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { getBoardResultQuery } from '@/server/query';
import { useGetBoardResultQueryProps } from '@/server/useGetCommentsQuery';
import type { UrlLangType } from '@/types/common';
import type {
  BoardListItemType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useQuery } from 'react-query';

export type CommunityHomeDataType = {
  recommendList: BoardListItemType[];
  recentlyList: BoardListItemType[];
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  communityHomeData: CommunityHomeDataType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData2: CommunityBoardResultResponseType;
};

const CommunityHomePage = ({
  urlLang,
  communityHomeData,
  boardCategoryData,
  boardResultData2,
}: CommunityPropTypes) => {
  const router = useRouter();
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(router.query.category_type as string) || 0;
  const searchValue = router.query.searchValue || '';
  const page = parseInt(router.query.page as string) - 1 || 0;
  const per_page = 20;

  const useGetBoardResultQueryProps: useGetBoardResultQueryProps = {
    category_type,
    searchValue,
    serverLang,
    page,
    per_page,
  };

  const { data: boardResultData, isSuccess: isBoardResultDataSuccess } = useQuery({
    queryKey: ['boardResults', useGetBoardResultQueryProps],
    queryFn: () => getBoardResultQuery(useGetBoardResultQueryProps),
    initialData: boardResultData2,
  });

  return (
    <Layout urlLang={urlLang}>
      <CommunityPageTemplate
        urlLang={urlLang}
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={isBoardResultDataSuccess && boardResultData}
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

  const communityHomeData = await getCommunityHomeData(userId, serverLang);
  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultData2 = await getCommunityBoardResultData(
    category_type,
    searchValue,
    serverLang,
    page,
    per_page
  );
  return {
    props: { urlLang, communityHomeData, boardCategoryData, boardResultData2 },
  };
};

export default CommunityHomePage;
