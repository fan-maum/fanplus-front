import Link from 'next/link';

const MainLogo = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <img
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        css={{
          margin: '0px 15px',
          '@media(max-width:768px)': {
            display: 'none',
          },
        }}
      />
      <img
        src="/images/fanplus_logo_small.png"
        alt="Fanplus 로고"
        css={{
          display: 'none',
          width: '26px',
          margin: '0px 15px',
          '@media(max-width: 768px)': {
            display: 'block',
          },
        }}
      />
    </Link>
  );
};

export default MainLogo;
