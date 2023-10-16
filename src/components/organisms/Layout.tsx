import type { UrlLangType } from '@/types/common';
import type { SideBarContextType } from '@/types/contextTypes';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useState } from 'react';
import Footer from '../molecules/Footer';
import NavBar from '../molecules/NavBar';
import SideBar from '../molecules/SideBar';
import { navBarTexts } from '@/texts/navBarTexts';
import { footerTexts } from '@/texts/footerTexts';

export const SideBarContext = createContext<SideBarContextType | null>(null);

const Layout = ({ children, urlLang }: { children: ReactNode; urlLang: UrlLangType }) => {
  const page = useRouter().pathname.split('/')[2];
  const noFooterPages = page === 'login' || page === 'signUp' || page === 'community';
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {isSideBarOpen && <SideBar texts={navBarTexts[urlLang]} />}
      <NavBar texts={navBarTexts[urlLang]} />
      {children}
      {!noFooterPages && <Footer texts={footerTexts[urlLang]} />}
    </SideBarContext.Provider>
  );
};

export default Layout;
