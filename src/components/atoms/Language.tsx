import { LangCookie, setLangCookie } from '@/utils/setLangCookie';
import Link from 'next/link';
import { useRouter } from 'next/router';

type PropType = {
  language: string;
  langCookie: LangCookie;
};

const Language = ({ language, langCookie }: PropType) => {
  const path = useRouter().asPath.split('/');
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
      <Link
        href={href}
        css={{
          width: '100%',
          textDecoration: 'none',
          color: 'rgb(148,148,148)',
          padding: '5px',
          paddingRight: '20px',
          lineHeight: '32px',
          ':hover': { color: '#ff5656' },
        }}
        onClick={() => setLangCookie(langCookie)}
      >
        {language}
      </Link>
    </div>
  );
};

export default Language;
