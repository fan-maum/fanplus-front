import Link from 'next/link';
import { useRouter } from 'next/router';

type NavBoxPropType = {
  title: string;
  link: string;
  isSide?: boolean;
};

const NavBox = ({ title, link, isSide }: NavBoxPropType) => {
  const path = useRouter().pathname;
  const picked = path === link;
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
          textAlign: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'color 0.5s',
          color: picked ? 'rgb(0,0,0)' : 'rgb(102,102,102)',
          ':hover': {
            color: 'rgb(0,0,0)',
            transition: 'color 0.5s',
          },
          '@media(max-width:991px)': isSide
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
