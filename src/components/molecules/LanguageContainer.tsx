import Language from '../atoms/Language';

const LanguageContainer = ({ isVoteCommunityPage }: { isVoteCommunityPage: boolean }) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '32px',
        right: '0px',
        padding: '10px 0px',
        zIndex: '19999',
        '@media(max-width: 991px)': {
          top: isVoteCommunityPage ? '32px' : '46px',
          width: '100%',
          minWidth: '180px',
          paddingTop: '0px',
        },
        '@media(max-width: 768px)': {
          top: '46px',
        },
      }}
    >
      <Language language="한국어" langCookie="ko" />
      <Language language="English" langCookie="en" />
      <Language language="Español" langCookie="es" />
      <Language language="日本語" langCookie="ja" />
      <Language language="中文 (简体)" langCookie="zh-CN" />
      <Language language="中文 (繁體)" langCookie="zh-TW" />
      <Language language="Bahasa Indonesia" langCookie="in" />
      <Language language="Tiếng việt" langCookie="vi" />
    </div>
  );
};

export default LanguageContainer;
