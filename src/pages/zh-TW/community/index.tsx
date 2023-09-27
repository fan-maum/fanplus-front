import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_TW, FooterText_zh_TW, CommunityMainText_zh_TW } from '@/texts/zh-TW';
import nookies from 'nookies';
import type {
  CommunityBoardCategoryResponseType,
  CommunityHomeResponseType,
} from '@/types/community';
import CommunityPageTemplate, {
  CommunityPropTypes,
} from '@/components/templates/CommunityPageTemplate';

const Community = ({
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPropTypes) => {
  return (
    <Layout navBarTexts={NavBarText_zh_TW} footerTexts={FooterText_zh_TW}>
      <CommunityPageTemplate
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        texts={CommunityMainText_zh_TW}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityHomeData: CommunityHomeResponseType;
  boardCategoryData: CommunityBoardCategoryResponseType;
}> = async (context) => {
  const cookies = nookies.get(context);
  const userId = cookies['user_id'] || '';
  const lang = 'zhtw';
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) - 1 || 0;
  const per_page = 20;

  const communityHomeData = await getCommunityHomeData(userId, lang);
  const boardCategoryData = await getCommunityBoardCategoryData(lang);
  const boardResultData = await getCommunityBoardResultData(
    category_type,
    searchValue,
    lang,
    page,
    per_page
  );
  return {
    props: { communityHomeData, boardCategoryData, boardResultData },
  };
};

export default Community;
