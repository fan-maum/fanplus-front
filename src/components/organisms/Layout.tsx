import React, { useState } from 'react';
import { FooterTextType, NavBarTextType } from '@/types/textTypes';
import { ReactNode } from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import SideBar from '../molecules/SideBar';
import { SideBarContextType } from '@/types/contextTypes';
import { createContext } from 'react';

export const SideBarContext = createContext<SideBarContextType | null>(null);

const Layout: React.FC<{
  navBarTexts: NavBarTextType;
  footerTexts: FooterTextType;
  children: ReactNode;
}> = ({ navBarTexts, footerTexts, children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {isSideBarOpen && <SideBar texts={navBarTexts} />}
      <NavBar texts={navBarTexts} />
      {children}
      <Footer texts={footerTexts} />
    </SideBarContext.Provider>
  );
};

export default Layout;
