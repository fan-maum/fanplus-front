import BusinessTemplate from '@/components/templates/BusinessTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const business = ({ urlLang }: { urlLang: UrlLangType }) => {
  return <BusinessTemplate urlLang={urlLang} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default business;
