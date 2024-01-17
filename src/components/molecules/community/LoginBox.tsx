import { colors } from '@/styles/CommunityColors';
import { CommunityPageTextType } from '@/types/textTypes';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface LoginBoxProps {
  loginTitle: string;
}

const LoginBox = ({ loginTitle }: LoginBoxProps) => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <LoginBoxWrapper onClick={() => router.push({ pathname: '/login', query: { nextUrl: path } })}>
      <img src="/fanplusLogo.svg" alt="fanplus logo" />
      <button>{loginTitle}</button>
    </LoginBoxWrapper>
  );
};

export default LoginBox;

const LoginBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 22px 24px 14px;
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  align-items: center;
  cursor: pointer;

  img {
    width: 38px;
    height: 38px;
  }

  button {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    outline: none;
    border: none;
    background-color: ${colors.primary[400]};
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.25px;
    cursor: inherit;
  }
`;
