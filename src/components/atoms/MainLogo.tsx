import Link from 'next/link';
import Image from 'next/image';

const MainLogo = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
      <Image
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        width={130}
        height={28}
        css={{
          margin: '0px 15px',
          '@media(max-width:991px)': {
            width: '120px',
            height: 'auto',
            margin: '0px 8px',
          },
        }}
      />
    </Link>
  );
};

export default MainLogo;
