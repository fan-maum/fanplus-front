import { useRouter } from 'next/router';

const MainLogo = () => {
  const router = useRouter();
  return (
    <>
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
        onClick={() => {
          router.push('/');
        }}
      />
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
        onClick={() => {
          router.push('/');
        }}
      />
    </>
  );
};

export default MainLogo;
