import React from 'react';
import styles from './styles/navBar.module.css';

const Language = ({ language }: { language: string }) => {
  return <div className={styles.language}>{language}</div>;
};

export default Language;
