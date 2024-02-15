import FAQTemplate from '@/components/templates/FAQTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const faq = ({ urlLang }: { urlLang: UrlLangType }) => {
  return <FAQTemplate urlLang={urlLang} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default faq;
