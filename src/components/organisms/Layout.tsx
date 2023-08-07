import React, { useState } from 'react';
import { FooterTextType, NavBarTextType } from '@/types/textTypes';
import { ReactNode } from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import SideBar from '../molecules/SideBar';
import { NextUrlContextType, SideBarContextType } from '@/types/contextTypes';
import { createContext } from 'react';
import { useRouter } from 'next/router';

export const SideBarContext = createContext<SideBarContextType | null>(null);
export const NextUrlContext = createContext<NextUrlContextType | null>(null);

const Layout: React.FC<{
  navBarTexts: NavBarTextType;
  footerTexts: FooterTextType;
  children: ReactNode;
}> = ({ navBarTexts, footerTexts, children }) => {
  const page = useRouter().pathname.split('/')[2];
  const isLoginSignUpPage = page === 'login' || page === 'signUp';
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [nextUrl, setNextUrl] = useState('/');
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      <NextUrlContext.Provider value={{ nextUrl, setNextUrl }}>
        {isSideBarOpen && <SideBar texts={navBarTexts} />}
        <NavBar texts={navBarTexts} />
        {children}
        {!isLoginSignUpPage && <Footer texts={footerTexts} />}
      </NextUrlContext.Provider>
    </SideBarContext.Provider>
  );
};

export default Layout;
