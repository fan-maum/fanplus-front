import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import type { ReactNode } from 'react';
import { isMobile } from 'react-device-detect';
import BestNotices from '../molecules/community/BestNotices';
import PopularBoards from '../molecules/community/PopularBoards';

const CommunityLayout = ({ children }: { children: ReactNode }) => {
  const urlLang = useUrlLanguage();
  const texts = communityLayoutTexts[urlLang];

  return (
    <div css={{ '@media (min-width: 768px)': { minHeight: '1200px' } }}>
      {!isMobile && <PopularBoards title={texts.popularBoards + ' TOP 30'} />}
      {!isMobile && <BestNotices />}
      {children}
    </div>
  );
};

export default CommunityLayout;
