import Language from './Language';
import { useRouter } from 'next/router';

const LanguageContainer = () => {
  const router = useRouter();
  const pageType = ['', 'votes', 'community', 'business', 'faq'];
  const pageLength = router.pathname.split('/').length;
  const page = router.pathname.split('/')[pageLength - 1];
  const link = pageType.includes(page) ? page : '';
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '32px',
        right: '0px',
        padding: '10px 0px',
        zIndex: '9999',
        '@media(max-width: 991px)': {
          top: '45px',
          width: '100%',
          minWidth: '180px',
          paddingTop: '0px',
        },
      }}
    >
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
