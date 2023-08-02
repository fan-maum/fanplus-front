import React, { useState } from 'react';
import { FooterTextType, NavBarTextType } from '@/types/textTypes';
import { ReactNode } from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import SideBar from '../molecules/SideBar';
import { LoginModalContextType, SideBarContextType } from '@/types/contextTypes';
import { createContext } from 'react';
import LoginModal from '../molecules/LoginModal';

export const SideBarContext = createContext<SideBarContextType | null>(null);
export const LoginModalContext = createContext<LoginModalContextType | null>(null);

const Layout: React.FC<{
  navBarTexts: NavBarTextType;
  footerTexts: FooterTextType;
  children: ReactNode;
}> = ({ navBarTexts, footerTexts, children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      <LoginModalContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
        {isSideBarOpen && <SideBar texts={navBarTexts} />}
        <NavBar texts={navBarTexts} />
        {isLoginModalOpen && <LoginModal />}
        {children}
        <Footer texts={footerTexts} />
      </LoginModalContext.Provider>
    </SideBarContext.Provider>
  );
};

export default Layout;
