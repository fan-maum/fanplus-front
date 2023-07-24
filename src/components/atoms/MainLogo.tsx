import Link from 'next/link';

const MainLogo = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <img
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        css={{
          margin: '0px 15px',
          '@media(max-width:991px)': {
            width: '120px',
            margin: '0px 8px',
          },
        }}
      />
    </Link>
  );
};

export default MainLogo;
