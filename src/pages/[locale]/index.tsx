import Layout from '@/components/organisms/Layout';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import type { UrlLangType } from '@/types/common';
import type { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import Head from 'next/head';

export default function Home({ urlLang }: { urlLang: UrlLangType }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextSeo
        title="Fanplus"
        description="팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다."
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '팬플러스, 팬플러스앱, 연예인, 아이돌, 덕질, 팬픽, 사진, 고화질',
          },
        ]}
        openGraph={{
          title: '서비스 소개',
          type: 'website',
          url: 'https://fanplus.co.kr/',
          siteName: '팬플러스(fanplus)',
          images: [{ url: 'https://fanplus.co.kr/wp-content/uploads/2020/04/fanplus_metatag.png' }],
          description:
            '팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다.',
        }}
      />
      <Layout urlLang={urlLang}>
        <MainPageTemplate urlLang={urlLang} />
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlLang = context.query.locale;
  return { props: { urlLang } };
};
