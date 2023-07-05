import React, { useState } from 'react';
import styles from './styles/navBar.module.css';
import LanguageList from './LanguageList';
import { css } from '@emotion/react';

const iconStyle = css`
  margin-right: 7px;
  width: 14px;
  height: 14px;
`;

const LanguageContainer = ({ currLang }: { currLang: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={styles.list}
      style={{ position: 'relative' }}
    >
      <div className={styles.pageLink}>
        <img src="/언어팩.svg" css={iconStyle} />
        {currLang}
      </div>
      {isHovered && <LanguageList />}
    </li>
  );
};

export default LanguageContainer;
