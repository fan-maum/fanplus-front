import { getBookmarks } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import type { UrlLangType } from '@/types/common';
import { BookmarksResponseType } from '@/types/community';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  bookmarksData: BookmarksResponseType;
};

const CommunityHomePage = ({ urlLang, bookmarksData }: CommunityPropTypes) => {
  return (
    <CommunityMainLayout urlLang={urlLang} bookmarksData={bookmarksData} withSearchInput>
      <CommunityPageTemplate bookmarksData={bookmarksData} />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || null;

  let bookmarksData;
  if (userId === null) {
    bookmarksData = { SUBSCRIPTION_BOARDS: [] };
  } else {
    bookmarksData = await getBookmarks(userId, 'ko_KR');
  }

  return { props: { urlLang, bookmarksData } };
};

export default CommunityHomePage;
