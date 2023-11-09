import PrivacyInternationalTemplate from '@/components/templates/PrivacyInternationalTemplate';
import PrivacyKoreanTemplate from '@/components/templates/PrivacyKoreanTemplate';
import { TermsType } from '@/types/common';
import { isAndroid, isIOSMobile } from '@/utils/userAgent';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';

export type ThirdPartyOnClickProps = {
  title: string;
  url: string;
};

const Privacy = ({ data }: TermsType) => {
  const { locale } = data;
  const [userAgent, setUserAgent] = useState<any>(null);
  useEffect(() => {
    const userAgent = navigator.userAgent;
    setUserAgent(userAgent);
  }, []);

  const thirdPartyOnClick = (title: string, url: string) => {
    if (
      (window as any).Android?.thirdPartyOnClick ||
      (window as any).webkit?.messageHandlers?.thirdPartyOnClick
    ) {
      if (isAndroid(userAgent)) {
        (window as any).Android.thirdPartyOnClick(title, url);
      } else if (isIOSMobile(userAgent)) {
        (window as any).webkit.messageHandlers.thirdPartyOnClick.postMessage(title, url);
      }
    } else {
      window.open(url);
    }
  };

  return locale === 'ko' ? (
    <PrivacyKoreanTemplate urlLang={locale} thirdPartyOnClick={thirdPartyOnClick} />
  ) : (
    <PrivacyInternationalTemplate urlLang={locale} thirdPartyOnClick={thirdPartyOnClick} />
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
