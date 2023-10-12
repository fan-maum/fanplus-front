import { loginPageTexts } from '@/texts/loginPageTexts';
import type { UrlLangType } from '@/types/common';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { isAndroid } from 'react-device-detect';
import IconArrowLeft from '../atoms/IconArrowLeft';
import IconFanPlus from '../atoms/IconFanPlus';
import AppleLoginButton from '../atoms/LoginButtons/AppleLoginButton';
import GoogleLoginButton from '../atoms/LoginButtons/GoogleLoginButton';
import CompletedShareModal from '../modals/CompletedShareModal';
import OtherBrowserModal from '../modals/OtherBrowserModal';

const LoginTemplate = ({ urlLang }: { urlLang: UrlLangType }) => {
  const router = useRouter();
  const nextUrl = router.query['nextUrl'] as string;
  const [otherBrowserModalOpen, setOtherBrowserModalOpen] = useState(false);
  const [completedShareModalIsOpen, setCompletedShareModalIsOpen] = useState(false);

  const texts = loginPageTexts[urlLang];

  const handleAppleLoginClick = () => {
    window.location.href = `/api/auth/login/apple?nextUrl=${nextUrl}`;
  };

  const handleGoogleLoginClick = () => {
    const userAgent = navigator?.userAgent;
    const unspportedBrowsers = /kakaotalk|naver|daum|wechat|micromessenger|line|fb|instagram/gi;
    if (userAgent?.match(unspportedBrowsers)) {
      setOtherBrowserModalOpen(true);
      return;
    }
    window.location.href = `/api/auth/login/google?nextUrl=${nextUrl}`;
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
          <OtherBrowserModal
            texts={{
              googleLoginProhibited: texts.modal.text1,
              useOtherBrowser: isAndroid ? texts.modal.text2AOS : texts.modal.text2IOS,
              useSamsungBrowser: isAndroid ? texts.modal.text3AOS : undefined,
              close: texts.modal.close,
              copyUrl: texts.modal.copyUrl,
            }}
            setBrowserModal={setOtherBrowserModalOpen}
            nextUrl={nextUrl}
            setCompletedShareModal={setCompletedShareModalIsOpen}
            opened={otherBrowserModalOpen}
          />
          <CompletedShareModal
            onClose={() => setCompletedShareModalIsOpen(false)}
            opened={completedShareModalIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginTemplate;
