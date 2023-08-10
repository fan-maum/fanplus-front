import { LangCookie, setLangCookie } from '@/utils/setLangCookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PropType = {
  language: string;
  langCookie: LangCookie;
};

const Language = ({ language, langCookie }: PropType) => {
  const router = useRouter();
  const path = router.asPath.split('/');
  path[1] = langCookie;
  const href = path.join('/');
  return (
    <div
      css={{
        width: '240px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        lineHeight: '40px',
        paddingLeft: '16px',
        backgroundColor: 'rgb(255,254,254)',
        borderBottom: '1px solid rgb(198,198,198)',
        boxShadow: '0px 4px 8px rgba(128,128,128,0.45)',
        '@media(max-width: 991px)': {
          width: '100%',
          height: '42px',
        },
      }}
    >
      <button
        css={{
          width: '100%',
          color: 'rgb(148,148,148)',
          textAlign: 'left',
          padding: '5px',
          paddingRight: '20px',
          lineHeight: '32px',
          backgroundColor: 'transparent',
          border: 'none',
          fontFamily: 'Pretendard',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          ':hover': { color: '#ff5656' },
          '@media(max-width:991px)': {
            fontSize: '15px',
          },
        }}
        onClick={() => {
          setLangCookie(langCookie);
          router.push(href);
        }}
      >
        {language}
      </button>
    </div>
  );
};

export default Language;
