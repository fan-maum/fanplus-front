import styles from './styles/NavBar.module.css';
import MainLogo from './MainLogo';
import NavContainer from './NavContainer';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { SideBarContext } from './Layout';
import { SideBarContextType } from '@/types/contextTypes';
import { NavBarTextType } from '@/types/textTypes';
import { useRouter } from 'next/router';
import LanguageBox from './LanguageBox';

const NavBar = ({ texts }: { texts: NavBarTextType }) => {
  const { setIsSideBar } = useContext(SideBarContext) as SideBarContextType;
  const router = useRouter();
  return (
    <>
      <div className={styles.navArea}>
        <div className={styles.navBarContainer}>
          <MainLogo link={texts.link.aboutUs} />
          <NavContainer texts={texts} />
          {router.asPath.endsWith('/votes') ? (
            <div className={styles.iconStyle} css={{ right: 100, width: 180 }}>
              <LanguageBox language={texts.language} />
            </div>
          ) : (
            <img
              src="/icons/사이드바.svg"
              className={styles.iconStyle}
              onClick={() => setIsSideBar(true)}
            />
          )}
        </div>
      </div>
      <div className={styles.backgroundStyle} />
    </>
  );
};

export default NavBar;
