import { FC, ReactNode, useContext } from 'react';

const onClickLogin = async (nextUrl: string, site: string) => {
  window.location.href = `/api/auth/login/${site}?nextUrl=${nextUrl}`;
};

type LoginButtonProps = {
  texts: string;
  site: string;
  icon?: ReactNode;
  nextUrl: string;
};

const BaseLoginButton: FC<LoginButtonProps> = ({ texts, site, icon, nextUrl }) => {
  // const { nextUrl } = useContext(NextUrlContext) as NextUrlContextType;
  // const router = useRouter();
  // const nextPath = router.pathname;
  // const queries =
  //   Object.keys(router.query).length !== 0 ? '?' + querystring.stringify(router.query, ';') : '';
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
      onClick={() => onClickLogin(nextUrl, site)}
    >
      {icon}
      {texts}
    </button>
  );
};

export default BaseLoginButton;
