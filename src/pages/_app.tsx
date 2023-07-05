import NavBar from '@/components/layout/NavBar';
import SideBar from '@/components/layout/SideBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, createContext } from 'react';
import { LangType, LangContextType, SideBarContextType } from '@/types/contextTypes';

export const LangContext = createContext<LangContextType | null>(null);
export const SideBarContext = createContext<SideBarContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [currLang, setCurrLang] = useState<LangType>('KOR');
  const [isSideBar, setIsSideBar] = useState<boolean>(true);
  return (
    <>
      <LangContext.Provider value={{ currLang, setCurrLang }}>
        <SideBarContext.Provider value={{ isSideBar, setIsSideBar }}>
          {isSideBar && <SideBar />}
          <NavBar />
          <Component {...pageProps} />
        </SideBarContext.Provider>
      </LangContext.Provider>
    </>
  );
}
