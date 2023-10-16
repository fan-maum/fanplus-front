import { getCommunityBoardData } from '@/api/Community';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
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
    <CommunityMyPostTemplate
      urlLang={urlLang}
      userId={userId}
      communityBoardData={communityBoardData}
    />
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
  const view_type = 'my_post';

  if (typeof boardIndex !== 'number') return { notFound: true };

  const communityBoardData = await getCommunityBoardData(
    userId,
    boardIndex,
    page,
    serverLang,
    boardLang,
    topic,
    view_type
  );

  return { props: { urlLang, userId, communityBoardData } };
};

export default MyPost;
