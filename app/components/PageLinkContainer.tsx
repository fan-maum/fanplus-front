import React from 'react';
import PageLink from './PageLink';
import LanguageContainer from './LanguageContainer';
import styles from './styles/navBar.module.css';

///// 투표, 커뮤니티로 가는 link Contaier

const PageLinkContainer = () => {
  return (
    <div className={styles.pageLinkContainer}>
      <ul className={styles.ul}>
        <PageLink title="투표" link="/votes" />
        <PageLink title="커뮤니티" link="/community" />
      </ul>
      <ul className={styles.ul}>
        <PageLink title="서비스 소개" link="/" />
        <PageLink
          title="채용"
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <PageLink title="제휴 문의" link="https://fanplus.co.kr/partnership/" />
        <PageLink title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageContainer />
      </ul>
    </div>
  );
};

export default PageLinkContainer;
