import LoginTemplate from '@/components/templates/LoginTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const login = ({ urlLang }: { urlLang: UrlLangType }) => {
  return <LoginTemplate urlLang={urlLang} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default login;
