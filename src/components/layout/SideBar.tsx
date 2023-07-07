import ServiceBox from './ServiceBox';
import LanguageContainer from './LanguageBox';
import styles from './styles/SideBar.module.css';
import { css } from '@emotion/react';
import { useContext, useState, useEffect } from 'react';
import { SideBarContext } from '@/pages/_app';
import { SideBarContextType } from '@/types/contextTypes';
import { NavBarTextType } from '@/types/textTypes';

const SideBar = ({ texts }: { texts: NavBarTextType }) => {
  const { isSideBar, setIsSideBar } = useContext(SideBarContext) as SideBarContextType;
  const [animation, setAnimation] = useState(true);
  useEffect(() => {
    let timeout;
    if (!animation) {
      timeout = setTimeout(() => {
        setIsSideBar(false);
      }, 270);
    }
    if (animation) {
      clearTimeout(timeout);
    }
  }, [animation]);
  useEffect(() => {
    if (isSideBar) {
      setAnimation(true);
    }
  }, [isSideBar]);

  const open = isSideBar && animation;

  return (
    <div
      className={open ? `${styles.modal} ${styles.open}` : styles.modal}
      onClick={() => setAnimation(false)}
    >
      <ul
        className={open ? `${styles.ul} ${styles.open}` : styles.ul}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${styles.list} ${styles.menu}`}>Menu</div>
        <ServiceBox title={texts.aboutUs} link={texts.link.aboutUs} />
        {texts.recruit && (
          <ServiceBox
            title={texts.recruit}
            link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
          />
        )}
        <ServiceBox title={texts.business} link={texts.link.business} />
        <ServiceBox title={texts.FAQ} link={texts.link.FAQ} />
        <LanguageContainer language={texts.language} />
      </ul>
    </div>
  );
};

export default SideBar;
