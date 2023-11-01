import { setUserOnboard } from '@/api/User';
import { signupPageTexts } from '@/texts/signupPageTexts';
import type { UrlLangType } from '@/types/common';
import { useRouter } from 'next/router';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import IconBack from '../atoms/IconBack';
import IconCheckButton from '../atoms/IconCheckButton';
import IconFanPlus from '../atoms/IconFanPlus';

const cookies = new Cookies();

const SignUpTemplate = ({ urlLang }: { urlLang: UrlLangType }) => {
  const router = useRouter();
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [start, setStart] = useState(false);

  const texts = signupPageTexts[urlLang];

  const handleClickStart = () => {
    if (check1 && check2 && check3 && check4) setStart(true);
  };
  const handleClickAgreeAll = () => {
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
  };
  useEffect(() => {
    async function update() {
      const user_id = cookies.get('user_id');
      const user_idx = cookies.get('user_idx');
      await setUserOnboard(user_id, user_idx);
      router.push((router.query['nextUrl'] as string)?.replaceAll(';', '&') || '/');
    }
    if (start === true) update();
  }, [start]);

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
      <IconBack
        iconCss={{
          alignSelf: 'start',
          display: 'none',
          margin: '25px 15px 10px',
          width: '27px',
          height: '20px',
          '@media(max-width:768px)': {
            display: 'block',
          },
        }}
        onClickBack={() => router.back()}
      />
      <div
        css={{
          maxWidth: '506px',
          maxHeight: '560px',
          width: '90%',
          minHeight: '70%',
          padding: '10px 50px',
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
            padding: '10px',
          },
        }}
      >
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '@media(max-width:768px)': { height: '35%', justifyContent: 'flex-end' },
          }}
        >
          <IconFanPlus
            iconCss={{
              alignSelf: 'center',
              marginBottom: '30px',
              '@media(max-width:768px)': { display: 'none' },
            }}
          />
          <h1 css={{ margin: '25px 0px' }}>{texts.heading}</h1>
          <p css={{ marginBottom: '50px', wordBreak: 'keep-all', lineHeight: '22px' }}>
            {texts.line1}
          </p>
          <p css={{ width: '100%', borderBottom: '3px solid #d9d9d9', marginBottom: '10px' }}></p>
        </div>
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            '@media(max-width:768px)': { height: '50%', justifyContent: 'flex-start' },
          }}
        >
          <ul css={{ width: '100%', padding: '3px' }}>
            <CheckList checked={check1} setChecked={setCheck1}>
              <p css={{ marginRight: '80px' }}>{texts.agree1}</p>
            </CheckList>
            <CheckList checked={check2} setChecked={setCheck2}>
              <p css={{ marginRight: '80px' }}>{texts.agree2}</p>
              <Anchor href={texts.agree2Link} text={texts.detail} />
            </CheckList>
            <CheckList checked={check3} setChecked={setCheck3}>
              <p css={{ marginRight: '80px' }}>{texts.agree3}</p>
              <Anchor href={texts.agree3Link} text={texts.detail} />
            </CheckList>
            <CheckList checked={check4} setChecked={setCheck4}>
              <p css={{ marginRight: '80px' }}>{texts.agree4}</p>
              <Anchor href={texts.agree4Link} text={texts.detail} />
            </CheckList>
          </ul>
          <div
            css={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
          >
            <button
              css={{
                width: '100px',
                height: '60px',
                border: check1 && check2 && check3 && check4 ? '0px' : '1px solid #abafb7',
                borderRadius: '30px',
                backgroundColor: check1 && check2 && check3 && check4 ? '#ff5656' : '#fff',
                color: check1 && check2 && check3 && check4 ? '#fff' : '#abafb7',
                marginRight: '10px',
                transition: '0.4s ease-out',
                ':hover': {
                  backgroundColor: check1 && check2 && check3 && check4 ? '#e64d4d' : '#fff',
                },
              }}
              onClick={handleClickStart}
            >
              {texts.start}
            </button>
            <button
              css={{
                width: '140px',
                height: '60px',
                border: '1px solid #d9d9d9',
                borderRadius: '30px',
                backgroundColor: '#ff5656',
                color: '#fff',
                ':hover': {
                  backgroundColor: check1 && check2 && check3 && check4 ? '#e64d4d' : '#ff5656',
                  transition: '0.4s ease-out',
                },
              }}
              onClick={handleClickAgreeAll}
            >
              {texts.agreeAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTemplate;

const CheckList = ({
  checked,
  setChecked,
  children,
}: {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) => {
  return (
    <li
      css={{
        width: '100%',
        lineHeight: '24px',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        margin: '8px 0px',
      }}
      onClick={() => setChecked((prev) => !prev)}
    >
      <IconCheckButton
        fill={checked ? '#ff5656' : '#fff'}
        stroke={checked ? '' : '#abafb7'}
        iconCss={{ marginRight: '5px', flexShrink: '0' }}
      />
      {children}
    </li>
  );
};

const Anchor = ({ href, text }: { href: string; text: string }) => {
  return (
    <a
      href={href}
      target="__blank"
      css={{ position: 'absolute', right: '0px', color: '#abafb7' }}
      onClick={(e) => e.stopPropagation()}
    >
      {text}
    </a>
  );
};
