import ProfileBox from '@/components/molecules/community/ProfileBox';
import LoginBox from '@/components/molecules/community/LoginBox';
import { useGetUserQuery, useGetUserQueryProps } from '@/server/useGetCommentsQuery';
import { UrlLangType } from '@/types/common';
import { communityMainPageTexts } from '@/texts/communityMainPageTexts';

interface MainAsideUserCardProps {
  urlLang: UrlLangType;
}

const MainAsideUserCard = ({ urlLang }: MainAsideUserCardProps) => {
  const texts = communityMainPageTexts[urlLang];
  // let user_idx = null;
  // let identity = null;
  let user_idx = '4114325';
  let identity = '24913d46b044b5ee9027f19f8c22ecc42a493ffc33a432bd4822ad9ba3523365';

  const useGetUserQueryProps: useGetUserQueryProps = {
    user_idx,
    identity,
  };

  const { data, isFetched } = useGetUserQuery(useGetUserQueryProps);

  if (user_idx === null || identity === null) return <LoginBox texts={texts} />;

  const userInfo = isFetched && data.RESULTS.DATAS;

  return (
    <ProfileBox
      nickname={userInfo.NICK}
      profileImage={userInfo.PROFILE_IMG_URL}
      user_id={identity}
      texts={texts}
    />
  );
};

export default MainAsideUserCard;
