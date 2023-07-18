import { useState } from 'react';
import LanguageContainer from './LanguageContainer';
import IconArrowDown from '../atoms/IconArrowDown';

const LanguageBox = ({ language, isVotePage }: { language: string; isVotePage: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      css={{
        listStyleType: 'none',
        float: 'left',
        fontSize: '16px',
        fontWeight: '600',
        color: 'rgb(102, 102, 102)',
        position: 'relative',
        '@media(max-width:991px)': {
          width: '100%',
          padding: isVotePage ? '0px' : '10px 20px',
          fontSize: isVotePage ? '16px' : '15px',
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          margin: '0px 8px',
          padding: '0px 8px',
          textAlign: 'center',
          lineHeight: '32px',
          alignItems: 'center',
          cursor: 'pointer',
          '@media(max-width:991px)': {
            height: isVotePage ? '32px' : '24px',
            margin: '0px',
            padding: '0px',
            justifyContent: 'space-between',
          },
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/icons/언어팩.svg"
            css={{
              margin: '0px 5px 2px 0px',
              width: '14px',
              height: '14px',
              '@media(max-width:991px)': { margin: '0px 5px 0px 0px' },
            }}
          />
          <p>{language}</p>
        </div>
        <IconArrowDown width="11" height="6" strokeWidth="3" isReverse={isHovered} />
      </div>
      {isHovered && <LanguageContainer isVotePage={isVotePage} />}
    </li>
  );
};

export default LanguageBox;
