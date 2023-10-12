import Layout from '@/components/organisms/Layout';
import FAQTemplate from '@/components/templates/FAQTemplate';
import { FAQText_KR } from '@/texts/ko';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const faq = ({ urlLang }: { urlLang: UrlLangType }) => {
  return (
    <Layout urlLang={urlLang}>
      <FAQTemplate texts={FAQText_KR} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default faq;
