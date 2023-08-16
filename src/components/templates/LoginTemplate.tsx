import GoogleLoginButton from '../atoms/LoginButtons/GoogleLoginButton';
import AppleLoginButton from '../atoms/LoginButtons/AppleLoginButton';
import IconFanPlus from '../atoms/IconFanPlus';
import IconArrowLeft from '../atoms/IconArrowLeft';
import { useRouter } from 'next/router';
import { LoginPageTextType } from '@/types/textTypes';

const LoginTemplate = ({ texts }: { texts: LoginPageTextType }) => {
  const router = useRouter();
  const nextUrl = router.query['nextUrl'] as string;

  const handleAppleLoginClick = () => {
    window.location.href = `/api/auth/login/apple?nextUrl=${nextUrl}`;
  };

  const handleGoogleLoginClick = () => {
    const userAgent = navigator?.userAgent;
    let isAllowed = false;

    const allowedBrowser = ['Chrome', 'Safari', 'Edge', 'Firefox', 'Opera'];
    // for (let i = 0; i < allowedBrowser.length; i++) {
    //   if (userAgent?.match(allowedBrowser[i])) {
    //     isAllowed = true;
    //   }
    // }
    allowedBrowser.forEach((browser) => {
      if (userAgent?.match(browser)) {
        isAllowed = true;
      }
    });
    if (!isAllowed) {
      alert('구글 로그인을 사용할 수 없습니다. 기본 브라우저에서 계속해주세요.');
      return;
    }
    router.push(`/api/auth/login/google?nextUrl=${nextUrl}`);
    return;

    // const userAgent = navigator?.userAgent;
    // const isKakao = userAgent?.match('KAKAOTALK');
    // const isNaver = userAgent?.match('NAVER') || userAgent?.match('NaverCafe');
    // const isDaum = userAgent?.match('Daum') || userAgent?.match('DAUM');
    // if (isKakao || isNaver || isDaum) {
    // alert('구글 로그인을 사용할 수 없습니다. 기본 브라우저에서 계속해주세요.');
    // return;
    // }
    // window.location.href = `/api/auth/login/google?nextUrl=${nextUrl}`;
  };
  return (
    <div
      css={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '@media(max-width:768px)': { justifyContent: 'flex-start' },
      }}
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
        onClickBack={() => router.back()}
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
            width: '100%',
            border: '0px',
            maxHeight: '80%',
            height: '80%',
          },
        }}
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
          <h2 css={{ margin: '25px 0px' }}>{texts.heading}</h2>
          <p css={{ marginBottom: '50px', textAlign: 'center', wordBreak: 'keep-all' }}>
            {texts.line1}
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
          <AppleLoginButton texts={texts.appleButton} onClick={handleAppleLoginClick} />
          <GoogleLoginButton texts={texts.googleButton} onClick={handleGoogleLoginClick} />
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
