import PrivacyInternationalTemplate from '@/components/templates/PrivacyInternationalTemplate';
import PrivacyKoreanTemplate from '@/components/templates/PrivacyKoreanTemplate';
import { TermsType } from '@/types/common';
import { GetStaticPaths, GetStaticProps } from 'next';

const Privacy = ({ data }: TermsType) => {
  const { locale } = data;
  return locale === 'ko' ? (
    <PrivacyKoreanTemplate urlLang={locale} />
  ) : (
    <PrivacyInternationalTemplate urlLang={locale} />
  );
};

export default Privacy;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = params;

  return {
    props: {
      data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locale: 'ko' } },
      { params: { locale: 'en' } },
      { params: { locale: 'es' } },
      { params: { locale: 'in' } },
      { params: { locale: 'ja' } },
      { params: { locale: 'vi' } },
      { params: { locale: 'zh-CN' } },
      { params: { locale: 'zh-TW' } },
    ],
    fallback: false,
  };
};
