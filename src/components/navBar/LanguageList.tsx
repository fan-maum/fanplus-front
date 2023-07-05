import styles from './styles/navBar.module.css';
import Language from './Language';
import { css } from '@emotion/react';

const LanguageList = () => {
  return (
    <div className={styles.languageList}>
      <Language language="한국어" href="/" />
      <Language language="English" href="https://fanplus.co.kr/en/about_fanplus_en/" />
      {/* <Language language="Español" href="/" /> */}
      <Language language="中文 (简体)" href="https://fanplus.co.kr/cn/about_fanplus_cn/" />
      <Language language="中文 (繁體)" href="https://fanplus.co.kr/tw/about_fanplus_tw/" />
    </div>
  );
};

export default LanguageList;
