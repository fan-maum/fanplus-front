import {
  getBookmarks,
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getUser,
} from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunitySearchTemplate from '@/components/templates/CommunitySearchTemplate';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import type { BoardLangType, ServerLangType, UrlLangType } from '@/types/common';
import type {
  CommunityBoardCategoryResponseType,
  CommunityBoardResultResponseType,
  PartialUserType,
} from '@/types/community';
import { GetServerSideProps } from 'next';
import { useQuery } from 'react-query';
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

export default function SearchPage({
  urlLang,
  boardLangCookie,
  user_id,
  boardCategoryData,
  boardResultData,
  initialProps,
  user,
}: SearchPageProps & { user: PartialUserType } & { user_id: string } & {
  boardLangCookie: BoardLangType;
}) {
  const { data } = useQuery(['bookmarks', { userId: user_id, urlLang }], () =>
    getBookmarks(user_id, urlLang)
  );
  const bookmarks = data ?? [];

  return (
    <CommunityMainLayout
      urlLang={urlLang}
      boardLangCookie={boardLangCookie}
      bookmarks={bookmarks}
      user={user}
      withSearchInput
      withBestNotices
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
  const cookies = nookies.get(context);
  const boardLangCookie = (cookies['boardLang'] as BoardLangType) || 'ALL';
  const urlLang = context.query.locale as UrlLangType;
  const serverLang = translateUrlLangToServerLang(urlLang);
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;
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

  const initialProps = { category_type, searchValue, serverLang, page };

  if (!!user_id && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(user_id, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return {
      props: {
        urlLang,
        boardLangCookie,
        user_id,
        boardCategoryData,
        boardResultData,
        initialProps,
        user,
      },
    };
  }

  return {
    props: {
      urlLang,
      boardLangCookie,
      user_id,
      boardCategoryData,
      boardResultData,
      initialProps,
    },
  };
};
