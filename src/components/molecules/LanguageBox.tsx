import { useState } from 'react';
import LanguageContainer from './LanguageContainer';
import IconArrowDown from '../atoms/IconArrowDown';
import IconGlobe from '../atoms/IconGlobe';

const LanguageBox = ({
  language,
  isVoteCommunityPage,
}: {
  language: string;
  isVoteCommunityPage: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const handleMouseOver = () => {
    if (!isTouching) {
      setIsHovered(true);
    }
  };
  const handleMouseOut = () => {
    if (!isTouching) {
      setIsHovered(false);
    }
  };
  const handleTouchStart = () => {
    setIsTouching(true);
    setIsHovered(!isHovered);
  };

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
        transition: '1s ease-in-out',
        '@media(max-width:991px)': {
          width: '100%',
          padding: isVoteCommunityPage ? '0px' : '10px 20px',
          fontSize: isVoteCommunityPage ? '16px' : '15px',
        },
      }}
    >
      <div
        onTouchStart={handleTouchStart}
        css={{
          height: '32px',
          display: 'flex',
          margin: '0px 8px',
          padding: '0px 8px',
          textAlign: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          '@media(max-width:991px)': {
            height: isVoteCommunityPage ? '32px' : '24px',
            margin: '0px',
            padding: '0px',
            justifyContent: 'space-between',
          },
        }}
      >
        <div css={{ display: 'flex', alignItems: 'center', marginRight: '5px' }}>
          <IconGlobe />
          <p>{language}</p>
        </div>
        <IconArrowDown width="11" height="6" strokeWidth="3" isReverse={isHovered} />
      </div>
      {isHovered && <LanguageContainer isVoteCommunityPage={isVoteCommunityPage} />}
    </li>
  );
};

export default LanguageBox;
