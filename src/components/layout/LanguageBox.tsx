import { useState } from 'react';
import styles from './styles/LanguageBox.module.css';
import LanguageList from './LanguageContainer';
import { css } from '@emotion/react';

const LanguageBox = ({ currLang }: { currLang: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className={styles.list}>
      <div className={styles.pageLink}>
        <img src="/언어팩.svg" className={styles.icon} />
        {currLang}
      </div>
      {isHovered && <LanguageList />}
    </li>
  );
};

export default LanguageBox;
