import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, CommunityMainText_zh_CN } from '@/texts/zh-CN';
import nookies from 'nookies';
import type { CommunityBoardCategoryResponseType } from '@/types/community';
import CommunityPageTemplate, {
  CommunityHomeDataType,
  CommunityPropTypes,
} from '@/components/templates/CommunityPageTemplate';

const Community = ({
  communityHomeData,
  boardCategoryData,
  boardResultData,
}: CommunityPropTypes) => {
  return (
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <CommunityPageTemplate
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        texts={CommunityMainText_zh_CN}
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
  const lang = 'zh';
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
