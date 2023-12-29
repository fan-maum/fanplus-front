import { getUser } from '@/api/Community';
import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';
import type { GetServerSideProps } from 'next';

export type CommunityPropTypes = {
  urlLang: UrlLangType;
  user: PartialUserType;
};

const CommunityHomePage = ({ urlLang, user }: CommunityPropTypes) => {
  return (
    <CommunityMainLayout urlLang={urlLang} user={user} withSearchInput>
      <CommunityPageTemplate />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;
  const user_id = context.req.cookies.user_id;
  const user_idx = context.req.cookies.user_idx;

  if (!!user_id && !!user_idx) {
    const { NICK, PROFILE_IMG_URL } = (await getUser(user_id, user_idx)).RESULTS.DATAS;
    const user = { nickname: NICK, profileImage: PROFILE_IMG_URL };
    return { props: { urlLang, user } };
  }

  return { props: { urlLang } };
};

export default CommunityHomePage;
