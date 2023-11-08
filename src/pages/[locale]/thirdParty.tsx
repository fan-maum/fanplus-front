import ThirdPartyInternationalTemplate from '@/components/templates/ThirdPartyInternationalTemplate';
import ThirdPartyKoreanTemplate from '@/components/templates/ThirdPartyKoreanTemplate';
import { TermsType } from '@/types/common';
import { GetStaticPaths, GetStaticProps } from 'next';

const ThirdParty = ({ data }: TermsType) => {
  const { locale } = data;
  return locale === 'ko' ? <ThirdPartyKoreanTemplate /> : <ThirdPartyInternationalTemplate />;
};

export default ThirdParty;

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
