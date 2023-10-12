import Layout from '@/components/organisms/Layout';
import BusinessTemplate from '@/components/templates/BusinessTemplate';
import { BusinessText_KR } from '@/texts/ko';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const business = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <BusinessTemplate texts={BusinessText_KR} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default business;
