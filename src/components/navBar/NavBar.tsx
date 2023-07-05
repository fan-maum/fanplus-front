import styles from './styles/navBar.module.css';
import MainLogo from './MainLogo';
import PageLinkContainer from './PageLinkContainer';
import { css } from '@emotion/react';
import { useState } from 'react';
import SideBar from './SideBar';

const NavBar = () => {
  const [sideBar, setSideBar] = useState(false);
  const handleClick = () => {
    console.log('sideBar click!');
    openSideBar();
  };
  const openSideBar = () => {
    setSideBar(true);
  };
  const closeSideBar = () => {
    setSideBar(false);
  };

  let backGroundStyle = css`
    width: 100%;
    height: 85px;
  `;

  let iconstyle = css`
    display: none;
    @media (max-width: 991px) {
      display: block;
    }
  `;

  return (
    <>
      <div className={styles.navArea}>
        <div className={styles.navBarContainer}>
          <MainLogo />
          <PageLinkContainer />
          <img src="/사이드바.svg" css={iconstyle} onClick={handleClick} />
        </div>
      </div>
      <div css={backGroundStyle} />
      {sideBar && <SideBar />}
    </>
  );
};

export default NavBar;
