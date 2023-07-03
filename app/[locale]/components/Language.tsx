import React from "react";
import styles from "./styles/navBar.module.css";
import Link from "next/link";

type PropType = {
  language: string;
  href: string;
};

const Language = ({ language, href }: PropType) => {
  return (
    <div className={styles.languageBox}>
      <Link href={href} className={styles.languageLink}>
        {language}
      </Link>
    </div>
  );
};

export default Language;
