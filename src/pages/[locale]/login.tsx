import Layout from '@/components/organisms/Layout';
import LoginTemplate from '@/components/templates/LoginTemplate';
import { LoginPageText_KR } from '@/texts/ko';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const login = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <LoginTemplate texts={LoginPageText_KR} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default login;
