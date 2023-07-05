import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import SideBar from '@/components/navBar/SideBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const openSideBar = () => setSideBarOpened(true);
  const closeSideBar = () => setSideBarOpened(false);
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
      <main className={`${styles.main} ${inter.className}`}>
        <div>main page</div>
        <button style={{ width: '100px', height: '100px' }} onClick={openSideBar}>
          버튼
        </button>
        {sideBarOpened && <SideBar />}
      </main>
    </>
  );
}
