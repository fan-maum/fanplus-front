import { getCommunityHomeData } from '@/api/Community';
import { GetServerSideProps } from 'next';
import Layout from '@/components/organisms/Layout';
import { NavBarText_KR, FooterText_KR } from '@/texts/ko';
import nookies from 'nookies';
import type { CommunityHomeResponseType } from '@/pages/api/community/home';
import CommunityPageTemplate, {
  CommunityPropTypes,
} from '@/components/templates/CommunityPageTemplate';

const Community = ({ communityHomeData }: CommunityPropTypes) => {
  return (
    <Layout navBarTexts={NavBarText_KR} footerTexts={FooterText_KR}>
      <CommunityPageTemplate communityHomeData={communityHomeData} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{
  communityHomeData: CommunityHomeResponseType;
}> = async (context) => {
  // TODO: api에 userId 값이 필요없게 변경될 예정.. (feat. 소진님)
  const cookies = nookies.get(context);
  const userId = cookies['user_id'];
  const communityHomeData = await getCommunityHomeData(userId);
  return {
    props: { communityHomeData },
  };
};

export default Community;
