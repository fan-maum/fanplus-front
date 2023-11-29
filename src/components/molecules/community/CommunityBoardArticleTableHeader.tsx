import { useUrlLanguage } from '@/hooks/useLanguage';
import { CommunityBoardArticleTableHeaderTexts } from '@/texts/communityBoardArticleTableHeaderTexts';

/**
 *
 * @param firstHeader 토픽인지 게시판 명인지 혹은 etc? 추가될 수도 있음
 */
const CommunityBoardArticleTableHeader = ({
  firstHeader = 'topic',
}: {
  firstHeader?: 'topic' | 'board';
}) => {
  const urlLang = useUrlLanguage();
  const texts = CommunityBoardArticleTableHeaderTexts[urlLang];
  return (
    <div
      css={{
        '@media (max-width: 768px)': { display: 'none' },
        display: 'flex',
        alignItems: 'center',
        height: '44px',
        font: 'normal 14px/16px Pretendard',
        fontWeight: '500',
        borderBottom: '1px solid #d9d9d9',
      }}
    >
      <div css={{ width: 106, textAlign: 'center' }}>{texts[firstHeader]}</div>
      <div css={{ flex: 1, textAlign: 'center' }}>{texts.title}</div>
      <div css={{ width: 78, textAlign: 'center' }}>{texts.writer}</div>
      <div css={{ width: 82, textAlign: 'center' }}>{texts.postDate}</div>
      <div css={{ width: 78, textAlign: 'center' }}>{texts.viewNum}</div>
      <div css={{ width: 74, textAlign: 'center' }}>{texts.recommendNum}</div>
    </div>
  );
};

export default CommunityBoardArticleTableHeader;
