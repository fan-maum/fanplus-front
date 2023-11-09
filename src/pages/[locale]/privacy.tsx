import PrivacyInternationalTemplate from '@/components/templates/PrivacyInternationalTemplate';
import PrivacyKoreanTemplate from '@/components/templates/PrivacyKoreanTemplate';
import { TermsType } from '@/types/common';
import { GetStaticPaths, GetStaticProps } from 'next';

export type ThirdPartyOnClickProps = {
  title: string;
  url: string;
};

const Privacy = ({ data }: TermsType) => {
  const { locale } = data;
  const ThirdPartyOnClick = (title: string, url: string) => {
    // eslint-disable-next-line no-console
    console.log(title, url); // 클라이언트 테스트를 위해 남겨놓은 콘솔입니다.
    return { title, url };
  };

  return locale === 'ko' ? (
    <PrivacyKoreanTemplate urlLang={locale} ThirdPartyOnClick={ThirdPartyOnClick} />
  ) : (
    <PrivacyInternationalTemplate urlLang={locale} ThirdPartyOnClick={ThirdPartyOnClick} />
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
