import Layout from '@/components/organisms/Layout';
import LoginTemplate from '@/components/templates/LoginTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const login = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <LoginTemplate urlLang={urlLang} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default login;
