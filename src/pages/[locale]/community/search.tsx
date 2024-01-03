import {
  getBookmarks,
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getUser,
} from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunitySearchTemplate from '@/components/templates/CommunitySearchTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { ServerLangType, UrlLangType } from '@/types/common';
import type {
  BookmarksResponseType,
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
  PartialUserType,
} from '@/types/community';
import { GetServerSideProps } from 'next';
import nookies from 'nookies';

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

export interface bookmarksSearchProps extends SearchPageProps {
  bookmarksData: BookmarksResponseType;
}

export default function SearchPage({
  urlLang,
  boardCategoryData,
  boardResultData,
  bookmarksData,
  initialProps,
  user,
}: SearchPageProps & { user: PartialUserType } & { bookmarksData: BookmarksResponseType }) {
  return (
    <CommunityMainLayout
      urlLang={urlLang}
      user={user}
      bookmarksData={bookmarksData}
      withSearchInput
    >
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
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || null;

  const user_id = context.req.cookies.user_id;
  const user_idx = context.req.cookies.user_idx;

  const boardCategoryData = await getCommunityBoardCategoryData(serverLang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    serverLang,
    page,
    per_page
  );

  let bookmarksData;
  if (userId === null) {
    bookmarksData = { SUBSCRIPTION_BOARDS: [] };
  } else {
    bookmarksData = await getBookmarks(userId, 'ko_KR');
  }

  const initialProps = { category_type, searchValue, serverLang, page };

  if (!!user_id && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(user_id, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { urlLang, boardCategoryData, boardResultData, initialProps, user } };
  }

  return {
    props: {
      urlLang,
      boardCategoryData,
      boardResultData,
      bookmarksData,
      initialProps,
    },
  };
};
