import ServiceBox from './ServiceBox';
import LanguageContainer from './LanguageBox';
import styles from './styles/SideBar.module.css';
import { css } from '@emotion/react';
import { useContext, useState, useEffect } from 'react';
import { LangContext, SideBarContext } from '@/pages/_app';
import { LangContextType, SideBarContextType } from '@/types/contextTypes';

const SideBar = () => {
  const { isSideBar, setIsSideBar } = useContext(SideBarContext) as SideBarContextType;
  const { currLang } = useContext(LangContext) as LangContextType;
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
        <ServiceBox title="서비스 소개" link="/" />
        <ServiceBox
          title="채용"
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <ServiceBox title="제휴 문의" link="https://fanplus.co.kr/partnership/" />
        <ServiceBox title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageContainer currLang={currLang} />
      </ul>
    </div>
  );
};

export default SideBar;
