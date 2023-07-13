import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useContext } from 'react';
import { LangContext } from './_app';
import { LangContextType } from '@/types/contextTypes';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { currLang } = useContext(LangContext) as LangContextType;
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        {currLang === '한국어' && <div>main page</div>}
        {currLang === 'English' && <div>Select English</div>}
      </main>
    </>
  );
}
