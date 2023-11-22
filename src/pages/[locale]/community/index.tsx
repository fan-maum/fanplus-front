import { getCommunityBoardCategoryData, getCommunityBoardResultData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import type { GetServerSideProps } from 'next';

type InitialBoardResultProps = {
  category_type: number;
  searchValue: string;
  serverLang: ServerLangType;
  page: number;
};

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
  initialProps: InitialBoardResultProps;
};

const CommunityHomePage = ({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
}: CommunityPropTypes) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityPageTemplate
        urlLang={urlLang}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        initialProps={initialProps}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    serverLang,
    page,
    per_page
  );
  const initialProps = { category_type, searchValue, serverLang, page };

  return {
    props: { urlLang, boardCategoryData, boardResultData, initialProps },
  };
};

export default CommunityHomePage;
