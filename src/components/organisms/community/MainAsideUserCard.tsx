import LoginBox from '@/components/molecules/community/LoginBox';
import ProfileBox from '@/components/molecules/community/ProfileBox';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import type { UrlLangType } from '@/types/common';
import type { PartialUserType } from '@/types/community';

interface MainAsideUserCardProps {
  urlLang: UrlLangType;
  user?: PartialUserType;
}

const MainAsideUserCard = ({ urlLang, user }: MainAsideUserCardProps) => {
  const texts = communityLayoutTexts[urlLang];

  if (!user) return <LoginBox loginTitle={texts.userCard[0]} />;
  return <ProfileBox user={user} texts={texts.userCard} />;
};

export default MainAsideUserCard;
