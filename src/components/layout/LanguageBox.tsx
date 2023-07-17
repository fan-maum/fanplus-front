import { useState } from 'react';
import LanguageContainer from './LanguageContainer';

const LanguageBox = ({ language }: { language: string }) => {
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
          padding: '10px 20px',
          borderBottom: '1px solid rgb(102,102,102)',
          fontSize: '15px',
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
            height: '24px',
            margin: '0px',
            padding: '0px',
          },
        }}
      >
        <img src="/icons/언어팩.svg" css={{ marginRight: '7px', width: '14px', height: '14px' }} />
        {language}
      </div>
      {isHovered && <LanguageContainer />}
    </li>
  );
};

export default LanguageBox;
