import { Avatar } from '@/components/atoms';
import IconArrowLeft from '@/components/atoms/IconArrowLeft';
import { colors } from '@/styles/Colors';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

interface ProfileBoxProps {
  nickname: string;
  profileImage: string;
  user_id: string | null;
  ProfileTexts: string[];
}
const ProfileBox = ({ nickname, profileImage, user_id, ProfileTexts }: ProfileBoxProps) => {
  const router = useRouter();
  const handleMyPost = () => {
    if (!user_id) {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
      return;
    }
    router.push(`/community/myPost`);
  };

  const handleLogout = () => {
    // router.push('/api/auth/logout');

    // eslint-disable-next-line no-console
    console.log('logged out');
  };

  return (
    <ProfileBoxWrapper>
      <div className="profileWrapper">
        <Avatar w={48} h={48} radius={'50%'} src={profileImage} alt="profileImage" />
        <div>
          <h6>{nickname}</h6>
          <div className="myPostButton" onClick={handleMyPost}>
            {ProfileTexts[1]}
            <IconArrowLeft
              stroke={'#000'}
              iconCss={{ width: '12px', height: '12px', transform: 'rotateZ(180deg)' }}
            />
          </div>
        </div>
      </div>
      {user_id !== null && (
        <button onClick={handleLogout}>
          {ProfileTexts[2]} <img src="/icons/icon_logout.svg" alt="icon_logout" />
        </button>
      )}
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
