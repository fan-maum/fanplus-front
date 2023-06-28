import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MainLogo = () => {
  return (
    <Link href={'/'}>
      <Image
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        width={130}
        height={28}
        style={{ margin: '0px 15px' }}
      ></Image>
    </Link>
  );
};

export default MainLogo;
