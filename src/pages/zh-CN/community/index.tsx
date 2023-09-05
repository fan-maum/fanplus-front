import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_zh_CN, FooterText_zh_CN } from '@/texts/zh-CN';
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
    <Layout navBarTexts={NavBarText_zh_CN} footerTexts={FooterText_zh_CN}>
      <CommunityPageTemplate
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityHomeData: CommunityHomeResponseType;
  boardCategoryData: CommunityBoardCategoryResponseType;
}> = async (context) => {
  // TODO: api에 userId 값이 필요없게 변경될 예정.. (feat. 소진님) + 게시판 언어 설정도..
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) || 0;
  const per_page = 20;
  const communityHomeData = await getCommunityHomeData(userId);
  const boardCategoryData = await getCommunityBoardCategoryData(userId);
  const boardResultData = await getCommunityBoardResultData(
    userId,
    category_type,
    searchValue,
    page,
    per_page
  );
  return {
    props: { communityHomeData, boardCategoryData, boardResultData },
  };
};

export default Community;
