import Head from 'next/head';
import { Inter } from 'next/font/google';
import MainPage from '@/components/mainPage/MainPage';
import MainPageText_KR from '@/components/mainPage/texts/KR';
import Layout from '@/components/layout/Layout';
import NavBarText_KR, { FooterText_KR } from '@/components/layout/texts/KR';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const navBarTexts = NavBarText_KR;
  const mainPageTexts = MainPageText_KR;
  return (
    <>
      <Head>
        <title>Fanplus</title>
        <meta
          name="description"
          content="팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다."
        />
        <meta
          name="keyword"
          content="팬플러스, 팬플러스앱, 연예인, 아이돌, 덕질, 팬픽, 사진, 고화질"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="서비스 소개" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fanplus.co.kr/" />
        <meta property="og:site_name" content="팬플러스(fanplus)" />
        <meta
          property="og:image"
          content="https://fanplus.co.kr/wp-content/uploads/2020/04/fanplus_metatag.png"
        />
        <meta
          property="og:description"
          content="팬플러스는 최애가 같은 팬들을 대상으로 다양한 콘텐츠와 소통 기능을 제공하는 종합 덕질 앱이에요. 유일하게 유료 결제 없는 아이돌 생일/기념일 투표를 진행하고 있답니다."
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout navBarTexts={navBarTexts} footerTexts={FooterText_KR}>
        <MainPage texts={mainPageTexts} />
      </Layout>
    </>
  );
}
