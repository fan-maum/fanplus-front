import { getCommunityBoardCategoryData, getCommunityBoardResultData } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunitySearchTemplate from '@/components/templates/CommunitySearchTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import { ServerLangType, UrlLangType } from '@/types/common';
import {
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
} from '@/types/community';
import { GetServerSideProps } from 'next';

type InitialBoardResultProps = {
  category_type: number;
  searchValue: string;
  serverLang: ServerLangType;
  page: number;
};

export interface SearchPageProps {
  urlLang: UrlLangType;
  boardCategoryData: CommunityBoardCategoryResponseType;
  boardResultData: CommunityBoardResultResponseType;
  initialProps: InitialBoardResultProps;
}

export default function SearchPage({
  urlLang,
  boardCategoryData,
  boardResultData,
  initialProps,
}: SearchPageProps) {
  return (
    <CommunityMainLayout urlLang={urlLang}>
      <CommunitySearchTemplate
        urlLang={urlLang}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        initialProps={initialProps}
      />
    </CommunityMainLayout>
  );
}

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
    props: {
      urlLang,
      boardCategoryData,
      boardResultData,
      initialProps,
    },
  };
};
