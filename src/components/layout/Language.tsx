import styles from './styles/Language.module.css';
import Link from 'next/link';
import { css } from '@emotion/react';

type PropType = {
  language: string;
  href: string;
};

const Language = ({ language, href }: PropType) => {
  return (
    <div className={styles.languageBox}>
      <Link href={href} className={styles.link}>
        {language}
      </Link>
    </div>
  );
};

export default Language;
