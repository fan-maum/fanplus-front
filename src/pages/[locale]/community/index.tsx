import CommunityMainLayout from '@/components/templates/CommunityMainLayout';
import CommunityPageTemplate from '@/components/templates/CommunityPageTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

export type CommunityPropTypes = {
  urlLang: UrlLangType;
};

const CommunityHomePage = ({ urlLang }: CommunityPropTypes) => {
  return (
    <CommunityMainLayout urlLang={urlLang} withSearchInput>
      <CommunityPageTemplate />
    </CommunityMainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale as UrlLangType;

  return { props: { urlLang } };
};

export default CommunityHomePage;
