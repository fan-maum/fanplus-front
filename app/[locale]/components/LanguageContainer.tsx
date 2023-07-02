"use client";

import React, { useState } from "react";
import styles from "./styles/navBar.module.css";
import LanguageList from "./LanguageList";

const LanguageContainer = ({ currLang }: { currLang: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={styles.list}
      style={{ position: "relative" }}
    >
      <div className={styles.pageLink}>{currLang}</div>
      {isHovered && <LanguageList />}
    </li>
  );
};

export default LanguageContainer;
