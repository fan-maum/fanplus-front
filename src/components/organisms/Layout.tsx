import React, { useState } from 'react';
import { FooterTextType, NavBarTextType } from '@/types/textTypes';
import { ReactNode } from 'react';
import NavBar from '../molecules/NavBar';
import Footer from '../molecules/Footer';
import SideBar from '../molecules/SideBar';
import {
  LoginModalContextType,
  SideBarContextType,
  SignUpModalContextType,
} from '@/types/contextTypes';
import { createContext } from 'react';
import LoginModal from '../molecules/LoginModal';
import SignUpModal from '../molecules/SignUpModal';

export const SideBarContext = createContext<SideBarContextType | null>(null);
export const LoginModalContext = createContext<LoginModalContextType | null>(null);
export const SignUpModalContext = createContext<SignUpModalContextType | null>(null);

const Layout: React.FC<{
  navBarTexts: NavBarTextType;
  footerTexts: FooterTextType;
  children: ReactNode;
}> = ({ navBarTexts, footerTexts, children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  return (
    <SideBarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      <LoginModalContext.Provider value={{ isLoginModalOpen, setIsLoginModalOpen }}>
        <SignUpModalContext.Provider value={{ isSignUpModalOpen, setIsSignUpModalOpen }}>
          {isSideBarOpen && <SideBar texts={navBarTexts} />}
          {isLoginModalOpen && <LoginModal />}
          {isSignUpModalOpen && <SignUpModal />}
          <NavBar texts={navBarTexts} />
          {children}
          <Footer texts={footerTexts} />
        </SignUpModalContext.Provider>
      </LoginModalContext.Provider>
    </SideBarContext.Provider>
  );
};

export default Layout;
