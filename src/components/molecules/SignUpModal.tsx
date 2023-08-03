import { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';
import { SignUpModalContext } from '../organisms/Layout';
import { SignUpModalContextType } from '@/types/contextTypes';
import IconFanPlus from '../atoms/IconFanPlus';
import IconBack from '../atoms/IconBack';
import IconCheckButton from '../atoms/IconCheckButton';

const LoginModal = () => {
  const { setIsSignUpModalOpen } = useContext(SignUpModalContext) as SignUpModalContextType;
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  return (
    <div
      css={{
        position: 'fixed',
        zIndex: '20000',
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
          justifyContent: 'flex-start',
          paddingBottom: '0px',
          borderTop: '0px',
        },
      }}
      onClick={() => setIsSignUpModalOpen(false)}
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
      />
      <div
        css={{
          maxWidth: '506px',
          maxHeight: '560px',
          width: '90%',
          minHeight: '40%',
          height: '70%',
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
        onClick={(event) => event.stopPropagation()}
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
          <h1 css={{ margin: '25px 0px' }}>팬플러스 이용약관</h1>
          <p css={{ marginBottom: '50px', wordBreak: 'keep-all', lineHeight: '22px' }}>
            팬플러스 서비스 이용을 위해 <br />
            약관에 동의해주세요
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
              <p>(필수) 만 14세 이상입니다.</p>
            </CheckList>
            <CheckList checked={check2} setChecked={setCheck2}>
              <p>(필수) 이용약관 동의</p>
              <Anchor href="https://privacy.fanplus.co.kr/terms_of_service_ko.htmlR" />
            </CheckList>
            <CheckList checked={check3} setChecked={setCheck3}>
              <p>(필수) 개인정보 처리 방침</p>
              <Anchor href="https://privacy.fanplus.co.kr/terms_of_service_ko.htmlR" />
            </CheckList>
            <CheckList checked={check4} setChecked={setCheck4}>
              <p>(필수) 개인정보 제 3자 제공 동의</p>
              <Anchor href="https://privacy.fanplus.co.kr/terms_of_service_ko.htmlR" />
            </CheckList>
          </ul>
          <div
            css={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}
          >
            <button
              css={{
                width: '100px',
                height: '60px',
                border: '1px solid #abafb7',
                borderRadius: '30px',
                backgroundColor: '#fff',
                marginRight: '10px',
                color: '#abafb7',
                ':hover': {
                  backgroundColor: check1 && check2 && check3 && check4 ? '#d9d9d9' : '#fff',
                  transition: '0.4s ease-out',
                },
              }}
            >
              시작
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
            >
              모두 동의하고 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

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
        height: '36px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
      onClick={() => setChecked((prev) => !prev)}
    >
      <IconCheckButton
        fill={checked ? '#ff5656' : '#fff'}
        stroke={checked ? '' : '#abafb7'}
        iconCss={{ marginRight: '5px' }}
      />
      {children}
    </li>
  );
};

const Anchor = ({ href }: { href: string }) => {
  return (
    <a
      href={href}
      target="__blank"
      css={{ position: 'absolute', right: '0px', color: '#abafb7' }}
      onClick={(e) => e.stopPropagation()}
    >
      보기
    </a>
  );
};
