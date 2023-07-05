import styles from './styles/NavBar.module.css';
import MainLogo from './MainLogo';
import PageLinkContainer from './NavContainer';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { LangContext, SideBarContext } from '@/pages/_app';
import { LangContextType, SideBarContextType } from '@/types/contextTypes';

const NavBar = () => {
  const { currLang, setCurrLang } = useContext(LangContext) as LangContextType;
  const { setIsSideBar } = useContext(SideBarContext) as SideBarContextType;

  return (
    <>
      <div className={styles.navArea}>
        <div className={styles.navBarContainer}>
          <MainLogo />
          <PageLinkContainer />
          <img
            src="/사이드바.svg"
            className={styles.iconStyle}
            onClick={() => setIsSideBar(true)}
          />
        </div>
      </div>
      <div className={styles.backgroundStyle} />
      {/* <div>{currLang}</div>
      <button onClick={() => setCurrLang('ENG')}>영어로</button>
      <button onClick={() => setCurrLang('KOR')}>다시 한글로</button> */}
    </>
  );
};

export default NavBar;
