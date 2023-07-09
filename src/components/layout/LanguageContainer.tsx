import styles from './styles/LanguageContainer.module.css';
import Language from './Language';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

const LanguageContainer = () => {
  const router = useRouter();
  const pageType = ['', 'votes', 'community', 'business', 'faq'];
  const pageLength = router.pathname.split('/').length;
  const page = router.pathname.split('/')[pageLength - 1];
  const link = pageType.includes(page) ? page : '';
  return (
    <div className={styles.container}>
      <Language language="한국어" href={`/${link}`} />
      <Language language="English" href={`/en/${link}`} />
      {/* <Language language="Español" href="/" /> */}
      <Language language="中文 (简体)" href="https://fanplus.co.kr/cn/about_fanplus_cn/" />
      <Language language="中文 (繁體)" href="https://fanplus.co.kr/tw/about_fanplus_tw/" />
    </div>
  );
};

export default LanguageContainer;
