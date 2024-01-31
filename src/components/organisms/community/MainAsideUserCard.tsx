import LoginBox from '@/components/molecules/community/LoginBox';
import ProfileBox from '@/components/molecules/community/ProfileBox';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import type { PartialUserType } from '@/types/community';
import { Dispatch, SetStateAction } from 'react';

interface MainAsideUserCardProps {
  user?: PartialUserType;
}

const MainAsideUserCard = ({ user }: MainAsideUserCardProps) => {
  const urlLang = useUrlLanguage();
  const texts = communityLayoutTexts[urlLang];

  if (!user) return <LoginBox loginTitle={texts.userCard[0]} />;
  return <ProfileBox user={user} texts={texts.userCard} />;
};

export default MainAsideUserCard;
