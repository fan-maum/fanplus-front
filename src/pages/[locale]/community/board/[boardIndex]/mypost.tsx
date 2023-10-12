import { getCommunityBoardData } from '@/api/Community';
import Layout from '@/components/organisms/Layout';
import CommunityMyPostTemplate from '@/components/templates/CommunityMyPostTemplate';
import { urlLangToBackLang } from '@/hooks/useLanguage';
import { CommunityBoardText_KR } from '@/texts/ko';
import type { UrlLangType } from '@/types/common';
import type { CommunityBoardResponseType } from '@/types/community';
import type { CommunityBoardTextType } from '@/types/textTypes';
import type { GetServerSideProps } from 'next';
import nookies from 'nookies';

export type CommunityMyPostPropType = {
  urlLang: UrlLangType;
  userId: string | null;
  communityBoardData: CommunityBoardResponseType;
  texts: CommunityBoardTextType;
};

const MyPost = ({ urlLang, userId, communityBoardData }: CommunityMyPostPropType) => {
  return (
    <Layout urlLang={urlLang}>
      <CommunityMyPostTemplate
        urlLang={urlLang}
        userId={userId}
        communityBoardData={communityBoardData}
        texts={CommunityBoardText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<
  Omit<CommunityMyPostPropType, 'texts'>
> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';

  const urlLang = context.query.locale as UrlLangType;
  const backLang = urlLangToBackLang(urlLang);
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
    backLang,
    boardLang,
    topic,
    view_type
  );

  return { props: { urlLang, userId, communityBoardData } };
};

export default MyPost;
