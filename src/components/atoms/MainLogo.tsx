import Link from 'next/link';

const MainLogo = () => {
  return (
    <>
      <Link href={'/'}>
        <img
          src="/images/fanplus_logo_hor.png"
          alt="Fanplus 로고"
          css={{
            margin: '0px 15px',
            cursor: 'pointer',
            '@media(max-width:768px)': {
              display: 'none',
            },
          }}
        />
      </Link>
      <Link href={'/'}>
        <img
          src="/images/fanplus_logo_small.png"
          alt="Fanplus 로고"
          css={{
            display: 'none',
            width: '26px',
            margin: '0px 15px',
            cursor: 'pointer',
            '@media(max-width: 768px)': {
              display: 'block',
            },
          }}
        />
      </Link>
    </>
  );
};

export default MainLogo;
