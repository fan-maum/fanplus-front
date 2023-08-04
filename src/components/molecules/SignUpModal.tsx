import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { SignUpModalContext } from '../organisms/Layout';
import { SignUpModalContextType } from '@/types/contextTypes';
import IconFanPlus from '../atoms/IconFanPlus';
import IconBack from '../atoms/IconBack';
import IconCheckButton from '../atoms/IconCheckButton';
import axios from 'axios';

const SignUpModal = () => {
  const { setIsSignUpModalOpen } = useContext(SignUpModalContext) as SignUpModalContextType;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [start, setStart] = useState(false);

  const handleClickStart = () => {
    if (check1 && check2 && check3 && check4) setStart(true);
  };
  const handleClickApproveAllStart = () => {
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
    setTimeout(() => setStart(true), 500);
  };
  useEffect(() => {
    async function update() {
      // TODO: url 뒤에 useridentity 값. (로그인 이후 서버에서 준 값.. 쿠키로 관리할 것 같습니다.) (소진님께 재확인 필요)
      // await axios.put(`https://napi.appphotocard.com/v1/users/${999999999999}`, {
      //   identity: '여기도 useridentity',
      //   target: 'onboarding_finished_yn',
      //   value: 'Y',
      // });
      setIsSignUpModalOpen(false);
    }
    if (start === true) update();
  }, [start]);

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
              onClick={handleClickApproveAllStart}
            >
              모두 동의하고 시작
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;

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
