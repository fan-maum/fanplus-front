import GoogleLoginButton from '../atoms/LoginButtons/GoogleLoginButton';
import AppleLoginButton from '../atoms/LoginButtons/AppleLoginButton';
import { useContext, useEffect } from 'react';
import { LoginModalContext } from '../organisms/Layout';
import { LoginModalContextType } from '@/types/contextTypes';
import IconFanPlus from '../atoms/IconFanPlus';
import IconArrowLeft from '../atoms/IconArrowLeft';

const LoginModal = () => {
  const { setIsLoginModalOpen } = useContext(LoginModalContext) as LoginModalContextType;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  return (
    <div
      css={{
        position: 'fixed',
        zIndex: '19999',
        width: '100%',
        height: '100%',
        top: '85px',
        paddingBottom: '85px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid #d9d9d9',
        '@media(max-width:991px)': {
          top: '70px',
          paddingBottom: '70px',
        },
        '@media(max-width:768px)': {
          top: '0px',
          height: '120%',
          zIndex: '20000',
          justifyContent: 'flex-start',
          paddingBottom: '0px',
          borderTop: '0px',
        },
      }}
      onClick={() => setIsLoginModalOpen(false)}
    >
      <IconArrowLeft
        iconCss={{
          alignSelf: 'start',
          display: 'none',
          margin: '20px 10px 0px',
          width: '36px',
          height: '36px',
          '@media(max-width:768px)': {
            display: 'block',
          },
        }}
      />
      <div
        css={{
          maxWidth: '506px',
          maxHeight: '434px',
          width: '80%',
          minHeight: '50%',
          padding: '5px',
          backgroundColor: 'white',
          border: '2px solid #d9d9d9',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          '@media(max-width:768px)': {
            border: '0px',
            maxHeight: '80%',
            height: '80%',
          },
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '@media(max-width:768px)': { height: '50%', justifyContent: 'flex-end' },
          }}
        >
          <IconFanPlus />
          <h2 css={{ margin: '25px 0px' }}>팬플러스 로그인 하기</h2>
          <p css={{ marginBottom: '50px', textAlign: 'center', wordBreak: 'keep-all' }}>
            팬플러스 서비스는 로그인 후 이용할 수 있습니다.
          </p>
        </div>
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '@media(max-width:768px)': { height: '50%', justifyContent: 'center' },
          }}
        >
          <AppleLoginButton texts="Apple로 로그인" />
          <GoogleLoginButton texts="Google 계정으로 로그인" />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
