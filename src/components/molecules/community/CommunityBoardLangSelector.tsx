import IconArrowDown from '@/components/atoms/IconArrowDown';
import IconFilter from '@/components/atoms/IconFilter';
import { BoardLangType } from '@/types/common';
import { useEffect, useState } from 'react';

type OwnPropType = {
  onClickOpenModal: () => void;
  language: string;
  tooltipText: string;
  boardLang: BoardLangType;
};

const CommunityBoardLangSelector = ({
  onClickOpenModal,
  language,
  tooltipText,
  boardLang,
}: OwnPropType) => {
  const [isTooltip, setIsTooltip] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('isTooltip') !== 'N' && boardLang === 'ALL') setIsTooltip(true);
  }, [isTooltip]);

  return (
    <div css={{ position: 'relative' }}>
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
        <span css={{ margin: '0px 5px' }}>{language}</span>
        <IconArrowDown width="11" height="6" strokeWidth="3" />
      </div>
      <span
        className="tooltip"
        css={{
          position: 'absolute',
          top: '27px',
          right: '21px',
          whiteSpace: 'nowrap',
          visibility: isTooltip ? 'visible' : 'hidden',
          padding: '6px 9px',
          borderRadius: '12px',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '12px',
          '::after': {
            content: "' '",
            position: 'absolute',
            right: '20%',
            top: '-12px',
            border: '6px solid',
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
