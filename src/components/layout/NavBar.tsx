import styles from './styles/NavBar.module.css';
import MainLogo from './MainLogo';
import PageLinkContainer from './NavContainer';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { LangContext, SideBarContext } from '@/pages/_app';
import { LangContextType, SideBarContextType } from '@/types/contextTypes';

const NavBar = () => {
  const { currLang, setCurrLang } = useContext(LangContext) as LangContextType;

  return (
    <>
      <div className={styles.navArea}>
        <div className={styles.navBarContainer}>
          <MainLogo />
          <PageLinkContainer />
        </div>
      </div>
      <div className={styles.backgroundStyle} />
      <div>{currLang}</div>
      <button onClick={() => setCurrLang('English')}>영어로</button>
      <button onClick={() => setCurrLang('한국어')}>다시 한글로</button>
    </>
  );
};

export default NavBar;
