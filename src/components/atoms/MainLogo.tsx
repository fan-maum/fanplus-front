import Link from 'next/link';

const MainLogo = () => {
  return (
    <>
      <Link
        href={'/'}
        css={{
          margin: '0px 15px',
          cursor: 'pointer',
          '@media(max-width:768px)': {
            display: 'none',
          },
        }}
      >
        <img src="/images/fanplus_logo_hor.png" alt="Fanplus 로고" />
      </Link>
      <Link
        href={'/'}
        css={{
          display: 'none',
          width: '26px',
          height: '26px',
          margin: '0px 15px',
          cursor: 'pointer',
          '@media(max-width: 768px)': {
            display: 'block',
          },
        }}
      >
        <img css={{ width: 'inherit' }} src="/images/fanplus_logo_small.png" alt="Fanplus 로고" />
      </Link>
    </>
  );
};

export default MainLogo;
