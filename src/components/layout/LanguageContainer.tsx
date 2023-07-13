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
      <Language language="Español" href={`/es/${link}`} />
      <Language language="日本語" href={`/ja/${link}`} />
      <Language language="中文 (简体)" href={`/zh-rCN/${link}`} />
      <Language language="中文 (繁體)" href={`/zh-rTW/${link}`} />
      <Language language="Bahasa Indonesia" href={`/in/${link}`} />
      <Language language="Tiếng việt" href={`/vi/${link}`} />
    </div>
  );
};

export default LanguageContainer;
