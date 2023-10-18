import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { UrlLangType } from '@/types/common';
import type {
  BoardListItemType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityHomeDataType = {
  recommendList: BoardListItemType[];
  recentlyList: BoardListItemType[];
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  communityHomeData: CommunityHomeDataType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
};

const CommunityHomePage = ({
  urlLang,
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPropTypes) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPageTemplate
        urlLang={urlLang}
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
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
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    serverLang,
    page,
    per_page
  );
  return {
    props: { urlLang, communityHomeData, boardCategoryData, boardResultData },
  };
};

export default CommunityHomePage;
