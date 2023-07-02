import React from "react";
import styles from "./styles/navBar.module.css";
import Language from "./Language";

const LanguageList = () => {
  return (
    <div className={styles.languageList}>
      <Language language="한국어" />
      <Language language="English" />
      <Language language="Español" />
      {/* <Language language="한국어" />
      <Language language="한국어" /> */}
    </div>
  );
};

export default LanguageList;
