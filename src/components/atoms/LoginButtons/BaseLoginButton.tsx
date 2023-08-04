import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import querystring from 'querystring';
import { Interpolation, Theme } from '@emotion/react';

const onClickLogin = async (nextUrl: string, site: string) => {
  window.location.href = `/api/auth/login/${site}?nextUrl=${nextUrl}`;
};

type LoginButtonProps = {
  texts: string;
  site: string;
  icon?: ReactNode;
  css?: Interpolation<Theme>;
};

const BaseLoginButton: FC<LoginButtonProps> = ({ texts, site, icon }) => {
  const router = useRouter();
  const nextPath = router.pathname;
  const queries =
    Object.keys(router.query).length !== 0 ? '?' + querystring.stringify(router.query, ';') : '';
  return (
    <button
      css={{
        maxWidth: '340px',
        maxHeight: '56px',
        width: '90%',
        minHeight: '45px',
        border: '1px solid #d9d9d9',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: '5px 0px',
        fontSize: '18px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#d9d9d9',
          transition: '0.4s ease-out',
        },
      }}
      onClick={() => onClickLogin(nextPath + queries, site)}
    >
      {icon}
      {texts}
    </button>
  );
};

export default BaseLoginButton;
