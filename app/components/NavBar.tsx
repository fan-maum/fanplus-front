import React from 'react';
import styles from './styles/navBar.module.css';
import MainLogo from './MainLogo';
import PageBox from './PageLinkContainer';

const NavBar = () => {
  return (
    <div className={styles.navBarContainer}>
      <MainLogo />
      <PageBox />
    </div>
  );
};

export default NavBar;
