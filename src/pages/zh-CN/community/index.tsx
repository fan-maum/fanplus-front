import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN, CommunityMainText_zh_CN } from '@/texts/zh-CN';
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
  communityHomeData: CommunityHomeResponseType;
  boardCategoryData: CommunityBoardCategoryResponseType;
}> = async (context) => {
  const userId = '1a11a56286d1c02c5eb4f38b6d6fa0f5d2db490e0783d70f1b0db7746c96d1cc';
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) || 0;
  const per_page = 20;
  const lang = 'zh';
  const communityHomeData = await getCommunityHomeData(userId);
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
