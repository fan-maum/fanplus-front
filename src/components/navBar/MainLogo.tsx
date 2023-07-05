import Link from 'next/link';
import { css } from '@emotion/react';

const MainLogo = () => {
  return (
    <Link href={'/'} style={{ flexShrink: '1', flexGrow: '1', maxWidth: '160px' }}>
      <img
        src="/images/fanplus_logo_hor.png"
        alt="Fanplus 로고"
        style={{ margin: '0px 15px' }}
      ></img>
    </Link>
  );
};

export default MainLogo;
