import GoogleLoginButton from '../atoms/LoginButtons/GoogleLoginButton';
import AppleLoginButton from '../atoms/LoginButtons/AppleLoginButton';
import { useContext } from 'react';
import { LoginModalContext } from '../organisms/Layout';
import { LoginModalContextType } from '@/types/contextTypes';
import IconFanPlus from '../atoms/IconFanPlus';

const LoginModal = () => {
  const { setIsLoginModalOpen } = useContext(LoginModalContext) as LoginModalContextType;
  return (
    <div
      css={{
        position: 'fixed',
        zIndex: '29999',
        width: '100%',
        height: '100%',
        paddingBottom: '70px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTop: '1px solid #d9d9d9',
      }}
      onClick={() => setIsLoginModalOpen(false)}
    >
      <div
        css={{
          maxWidth: '506px',
          maxHeight: '434px',
          width: '80%',
          minHeight: '40%',
          height: '50%',
          padding: '5px',
          backgroundColor: 'white',
          border: '2px solid #d9d9d9',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <IconFanPlus />
        <h2 css={{ margin: '25px 0px' }}>팬플러스 로그인 하기</h2>
        <p css={{ marginBottom: '50px', textAlign: 'center', wordBreak: 'keep-all' }}>
          팬플러스 서비스는 로그인 후 이용할 수 있습니다.
        </p>
        <GoogleLoginButton texts="Google 계정으로 로그인" />
        <AppleLoginButton texts="Apple로 로그인" />
      </div>
    </div>
  );
};

export default LoginModal;
