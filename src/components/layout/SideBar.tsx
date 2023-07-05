import ServiceBox from './ServiceBox';
import LanguageContainer from './LanguageBox';
import styles from './styles/SideBar.module.css';
import { css } from '@emotion/react';
import { MouseEventHandler, useContext } from 'react';
import { SideBarContext } from '@/pages/_app';
import { SideBarContextType } from '@/types/contextTypes';

const SideBar = () => {
  const { setIsSideBar } = useContext(SideBarContext) as SideBarContextType;

  return (
    <div className={styles.modalBackground} onClick={() => setIsSideBar(false)}>
      <ul className={styles.ul}>
        <div className={styles.list}>Menu</div>
        <ServiceBox title="서비스 소개" link="/" />
        <ServiceBox
          title="채용"
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <ServiceBox title="제휴 문의" link="https://fanplus.co.kr/partnership/" />
        <ServiceBox title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageContainer currLang="한국어" />
      </ul>
    </div>
  );
};

export default SideBar;
