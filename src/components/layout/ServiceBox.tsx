import Link from 'next/link';
import { useRouter } from 'next/router';

type PageLinkPropType = {
  title: string;
  link: string;
};

const ServiceBox = ({ title, link }: PageLinkPropType) => {
  const path = useRouter().pathname;
  const picked = path === link;
  return (
    <li
      css={{
        flexDirection: 'column',
        listStyleType: 'none',
        float: 'left',
        fontSize: '16px',
        fontWeight: '600',
        color: 'rgb(102, 102, 102)',
        '@media(max-width:991px)': {
          width: '100%',
          padding: '10px 20px',
          fontSize: '15px',
        },
      }}
    >
      <Link
        href={link}
        css={{
          display: 'flex',
          margin: '0px 8px',
          padding: '0px 8px',
          textAlign: 'center',
          lineHeight: '32px',
          alignItems: 'center',
          textDecoration: 'none',
          transition: 'color 0.5s',
          color: picked ? 'rgb(0,0,0)' : 'rgb(102,102,102)',
          ':hover': {
            color: 'rgb(0,0,0)',
            transition: 'color 0.5s',
          },
          '@media(max-width:991px)': { margin: '0px', padding: '0px', height: '24px' },
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default ServiceBox;
