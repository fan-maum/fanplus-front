import { useState } from 'react';
import styles from './styles/LanguageBox.module.css';
import LanguageList from './LanguageContainer';
import { css } from '@emotion/react';

const LanguageBox = ({ language }: { language: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={styles.list}>
      <div className={styles.pageLink}>
        <img src="/icons/언어팩.svg" className={styles.icon} />
        {language}
      </div>
      {isHovered && <LanguageList />}
    </li>
  );
};

export default LanguageBox;
