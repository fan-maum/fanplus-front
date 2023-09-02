import { getCommunityHomeData } from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_JAP, FooterText_JAP, CommunityMainText_JAP } from '@/texts/ja';
import nookies from 'nookies';
import type { CommunityHomeResponseType } from '@/types/community';
import CommunityPageTemplate, {
  CommunityPropTypes,
} from '@/components/templates/CommunityPageTemplate';

const Community = ({ communityHomeData }: CommunityPropTypes) => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <CommunityPageTemplate communityHomeData={communityHomeData} texts={CommunityMainText_JAP} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityHomeData: CommunityHomeResponseType;
}> = async (context) => {
  // TODO: api에 userId 값이 필요없게 변경될 예정.. (feat. 소진님) + 게시판 언어 설정도..
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const communityHomeData = await getCommunityHomeData(userId);
  return {
    props: { communityHomeData },
  };
};

export default Community;
