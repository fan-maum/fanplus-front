import { Avatar } from '@/components/atoms';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/Colors';
import type { PartialUserType } from '@/types/community';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

interface ProfileBoxProps {
  user: PartialUserType;
  texts: string[];
}
const ProfileBox = ({ user, texts }: ProfileBoxProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const [, , removeCookie] = useCookies(['user_id', 'user_idx']);

  const handleLogout = () => {
    removeCookie('user_id', { path: '/', secure: true, domain: '.fanplus.co.kr' });
    removeCookie('user_idx', { path: '/', secure: true, domain: '.fanplus.co.kr' });

    router.reload();
  };

  const routeToMyPost = () => {
    router.push(`/${urlLang}/community/myPost/`);
  };

  return (
    <ProfileBoxWrapper>
      <div className="profileWrapper">
        <Avatar w={48} h={48} radius={'50%'} src={user.profileImage} alt="profileImage" />
        <div>
          <h6>{user.nickname}</h6>
          <div className="myPostButton" onClick={routeToMyPost}>
            {texts[1]}
            <IconArrowLeft
              stroke={'#000'}
              iconCss={{ width: '12px', height: '12px', transform: 'rotateZ(180deg)' }}
            />
          </div>
        </div>
      </div>
      <button onClick={handleLogout}>
        {texts[2]} <img src="/icons/icon_logout.svg" alt="icon_logout" />
      </button>
    </ProfileBoxWrapper>
  );
};

export default ProfileBox;

const ProfileBoxWrapper = styled.div`
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  padding: 20px 24px 14px;

  .profileWrapper {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    color: #000;
    h6 {
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      letter-spacing: -0.25px;
      margin-bottom: 4px;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-word;
    }
    .myPostButton {
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: -0.25px;
      cursor: pointer;
    }
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2px;
    width: 100%;
    height: 40px;
    border-radius: 20px;
    outline: none;
    border: 1px solid ${colors.gray[200]};
    background-color: #fff;
    color: ${colors.gray[500]};
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.25px;
    cursor: pointer;

    img {
      width: 18px;
      height: 18px;
    }
  }
`;
