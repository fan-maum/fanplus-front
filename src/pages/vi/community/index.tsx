import {
  getCommunityBoardCategoryData,
  getCommunityBoardResultData,
  getCommunityHomeData,
} from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_VIE, FooterText_VIE, CommunityMainText_VIE } from '@/texts/vi';
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
    <Layout navBarTexts={NavBarText_VIE} footerTexts={FooterText_VIE}>
      <CommunityPageTemplate
        communityHomeData={communityHomeData}
        boardCategoryData={boardCategoryData}
        boardResultData={boardResultData}
        texts={CommunityMainText_VIE}
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
  const lang = 'vi';
  const category_type = parseInt(context.query.category_type as string) || 0;
  const searchValue = context.query.searchValue || '';
  const page = parseInt(context.query.page as string) || 0;
  const per_page = 20;

  // TODO: userId 필요없는 api 나올 예정 (게시판 검색 부분: 경은님 쪽 작업)
  const mockUserId = '1a11a56286d1c02c5eb4f38b6d6fa0f5d2db490e0783d70f1b0db7746c96d1cc';

  const communityHomeData = await getCommunityHomeData(userId, lang);
  const boardCategoryData = await getCommunityBoardCategoryData(mockUserId);
  const boardResultData = await getCommunityBoardResultData(
    mockUserId,
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
