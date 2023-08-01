import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import { Interpolation, Theme } from '@emotion/react';

const onClickLogin = async (nextUrl: string, site: string) => {
  window.location.href = (
    await axios.post(`${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/auth/login/${site}`, {
      data: nextUrl,
    })
  ).data;
};

type LoginButtonProps = {
  texts: string;
  site: string;
  icon?: ReactNode;
  css?: Interpolation<Theme>;
};

const BaseLoginButton: FC<LoginButtonProps> = ({ texts, site }) => {
  const router = useRouter();
  const nextUrl = process.env.NEXT_PUBLIC_DEV_BASE_PATH + router.pathname;
  const queries =
    Object.keys(router.query).length !== 0 ? '?' + querystring.stringify(router.query, ';') : '';
  return (
    <button
      css={{
        margin: '100px',
        width: '300px',
        height: '100px',
      }}
      onClick={() => onClickLogin(nextUrl + queries, site)}
    >
      {texts}
    </button>
  );
};

export default BaseLoginButton;
