import Layout from '@/components/organisms/Layout';
import FAQTemplate from '@/components/templates/FAQTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const faq = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <FAQTemplate urlLang={urlLang} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default faq;
