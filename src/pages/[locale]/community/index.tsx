import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_KR, FooterText_KR, CommunityMainText_KR } from '@/texts/ko';
import nookies from 'nookies';
import type { CommunityBoardCategoryResponseType } from '@/types/community';
import CommunityPageTemplate, {
  CommunityHomeDataType,
  CommunityPropTypes,
} from '@/components/templates/CommunityPageTemplate';
import { LangCookie } from '@/utils/setLangCookie';
import { urlLangToBackLang } from '@/hooks/useLanguage';

const Community = ({
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPropTypes) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityPageTemplate
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        texts={CommunityMainText_KR}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityHomeData: CommunityHomeDataType;
  boardCategoryData: CommunityBoardCategoryResponseType;
}> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const urlLang = (context.query.locale || 'en') as LangCookie;
  const backLang = urlLangToBackLang(urlLang);
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  const communityHomeData = await getCommunityHomeData(userId, backLang);
  const boardCategoryData = await getCommunityBoardCategoryData(backLang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    backLang,
    page,
    per_page
  );
  return {
    props: { communityHomeData, boardCategoryData, boardResultData },
  };
};

export default Community;
