import React, { useContext } from 'react';

import { NavBarTextType } from '@/types/textTypes';
import { ReactNode } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import SideBar from './SideBar';
import { SideBarContext } from '@/pages/_app';
import { SideBarContextType } from '@/types/contextTypes';

const Layout: React.FC<{ navBarTexts: NavBarTextType; children: ReactNode }> = ({
  navBarTexts,
  children,
}) => {
  const { isSideBar } = useContext(SideBarContext) as SideBarContextType;
  return (
    <>
      {isSideBar && <SideBar texts={navBarTexts} />}
      <NavBar texts={navBarTexts} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
