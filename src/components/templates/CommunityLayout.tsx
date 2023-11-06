import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import type { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import PopularBoards from '../molecules/community/PopularBoards';

const CommunityLayout = ({ children }: { children: ReactNode }) => {
  const urlLang = useUrlLanguage();
  const texts = communityLayoutTexts[urlLang];

  return (
    <div>
      {!isMobile && <PopularBoards title={texts.popularBoards + ' TOP 30'} />}
      {children}
    </div>
  );
};

export default CommunityLayout;
