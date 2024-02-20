import IconArrowDown from '@/components/atoms/IconArrowDown';
import IconFilter from '@/components/atoms/IconFilter';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { BoardLangType } from '@/types/common';
import { useEffect, useState } from 'react';

type OwnPropType = {
  onClickOpenModal: () => void;
  boardLang: BoardLangType;
};

const CommunityBoardLangSelector = ({ onClickOpenModal, boardLang }: OwnPropType) => {
  const [isTooltip, setIsTooltip] = useState(false);
  const urlLang = useUrlLanguage();
  const texts = communityBoardTexts[urlLang];
  const language = texts.boardLang[boardLang];
  const tooltipText = texts.langSelectorToolTip;

  useEffect(() => {
    if (sessionStorage.getItem('isTooltip') !== 'N' && boardLang === 'ALL') setIsTooltip(true);
  }, [isTooltip]);

  return (
    <div css={{ position: 'relative', paddingRight: 16 }}>
      <div
        css={{
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => {
          onClickOpenModal();
          setIsTooltip(false);
          sessionStorage.setItem('isTooltip', 'N');
        }}
      >
        <IconFilter />
        <span css={{ margin: '0px 5px', fontSize: '12px', fontWeight: 400 }}>{language}</span>
        <IconArrowDown width="11" height="6" strokeWidth="3" />
      </div>
      <span
        className="tooltip"
        css={{
          position: 'absolute',
          top: '20px',
          right: '16px',
          whiteSpace: 'nowrap',
          visibility: isTooltip ? 'visible' : 'hidden',
          padding: '4px 14px',
          borderRadius: '12px',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '10px',
          fontWeight: 500,
          zIndex: 100,
          '::after': {
            content: "' '",
            position: 'absolute',
            right: '12%',
            top: '-10px',
            border: '5px solid',
            borderColor: 'transparent transparent #000 transparent',
          },
        }}
      >
        {tooltipText}
      </span>
    </div>
  );
};

export default CommunityBoardLangSelector;
