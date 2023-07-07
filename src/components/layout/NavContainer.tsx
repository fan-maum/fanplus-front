import PageBox from './PageBox';
import LanguageBox from './LanguageBox';
import styles from './styles/NavContainer.module.css';
import { css } from '@emotion/react';
import { NavBarTextType } from '@/types/textTypes';

const NavContainer = ({ texts }: { texts: NavBarTextType }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <PageBox title={texts.vote} link={texts.link.vote} />
        <PageBox title={texts.community} link={texts.link.community} />
      </ul>
      <ul className={`${styles.ul} ${styles.ul_service}`}>
        <PageBox title={texts.aboutUs} link={texts.link.aboutUs} />
        <PageBox
          title={texts.recruit}
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <PageBox title={texts.business} link={texts.link.business} />
        <PageBox title={texts.FAQ} link={texts.link.FAQ} />
        <LanguageBox language={texts.language} />
      </ul>
    </div>
  );
};

export default NavContainer;
