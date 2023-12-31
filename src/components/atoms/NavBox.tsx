import { pathOnly } from '@/utils/util';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavBoxPropType = {
  title: string;
  link: string;
  isSide?: boolean;
};

const NavBox = ({ title, link, isSide }: NavBoxPropType) => {
  const router = useRouter();
  const path = pathOnly(router.asPath);
  const isHighlight =
    path === link ||
    (path.includes('vote') && link.includes('vote')) ||
    (path.includes('community') && link.includes('community'));
  return (
    <li
      css={{
        listStyleType: 'none',
        float: 'left',
        fontSize: '16px',
        fontWeight: '600',
        color: 'rgb(102, 102, 102)',
        '@media(max-width:991px)': isSide
          ? {
              width: '100%',
              padding: '10px 20px',
              fontSize: '15px',
            }
          : {},
      }}
    >
      <Link
        href={link}
        css={{
          display: 'flex',
          margin: '0px 8px',
          padding: '0px 8px',
          lineHeight: '22px',
          textAlign: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'color 0.5s',
          color: isHighlight ? '#ff5656' : 'rgb(102,102,102)',
          ':hover': {
            color: 'rgb(0,0,0)',
            transition: 'color 0.5s',
          },
          '@media(max-width:768px)': isSide
            ? { margin: '0px', padding: '0px', height: '24px' }
            : { margin: '0px 5px', padding: '0px 2px' },
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default NavBox;
