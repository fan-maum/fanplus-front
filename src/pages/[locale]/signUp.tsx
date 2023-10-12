import Layout from '@/components/organisms/Layout';
import SignUpTemplate from '@/components/templates/SignUpTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const signUp = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <SignUpTemplate urlLang={urlLang} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default signUp;
