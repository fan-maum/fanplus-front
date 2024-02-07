import SignUpTemplate from '@/components/templates/SignUpTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';

const signUp = ({ urlLang }: { urlLang: UrlLangType }) => {
  return <SignUpTemplate urlLang={urlLang} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};

export default signUp;
