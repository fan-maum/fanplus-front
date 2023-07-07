import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useState, createContext } from 'react';
import { SideBarContextType } from '@/types/contextTypes';

export const SideBarContext = createContext<SideBarContextType | null>(null);

export default function App({ Component, pageProps }: AppProps) {
  const [isSideBar, setIsSideBar] = useState<boolean>(false);
  return (
    <>
      <SideBarContext.Provider value={{ isSideBar, setIsSideBar }}>
        <Component {...pageProps} />
      </SideBarContext.Provider>
    </>
  );
}
