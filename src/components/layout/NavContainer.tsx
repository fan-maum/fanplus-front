import PageBox from './PageBox';
import ServiceBox from './ServiceBox';
import LanguageBox from './LanguageBox';
import styles from './styles/NavContainer.module.css';
import { css } from '@emotion/react';
import { LangContext } from '@/pages/_app';
import { LangContextType } from '@/types/contextTypes';
import { useContext } from 'react';

const PageLinkContainer = () => {
  const { currLang } = useContext(LangContext) as LangContextType;

  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <PageBox title="투표" link="/votes" />
        <PageBox title="커뮤니티" link="/community" />
      </ul>
      <ul className={`${styles.ul} ${styles.ul_service}`}>
        <ServiceBox title="서비스 소개" link="/" />
        <ServiceBox
          title="채용"
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <ServiceBox title="제휴 문의" link="https://fanplus.co.kr/partnership/" />
        <ServiceBox title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageBox currLang={currLang} />
      </ul>
    </div>
  );
};

export default PageLinkContainer;
