import PageBox from './PageBox';
import ServiceBox from './ServiceBox';
import LanguageBox from './LanguageBox';
import styles from './styles/NavContainer.module.css';
import { css } from '@emotion/react';
import { NavBarTextType } from '@/types/textTypes';

const NavContainer = ({ texts }: { texts: NavBarTextType }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.ul}>
        <PageBox title={texts.vote} link={texts.link.vote} />
        {/* <PageBox title={texts.community} link={texts.link.community} /> */}
      </ul>
      <ul className={`${styles.ul} ${styles.ul_service}`}>
        <ServiceBox title={texts.aboutUs} link={texts.link.aboutUs} />
        {texts.recruit && (
          <ServiceBox
            title={texts.recruit}
            link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
          />
        )}
        <ServiceBox title={texts.business} link={texts.link.business} />
        <ServiceBox title="FAQ" link={texts.link.faq} />
        <LanguageBox language={texts.language} />
      </ul>
    </div>
  );
};

export default NavContainer;
