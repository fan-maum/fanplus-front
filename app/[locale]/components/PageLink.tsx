"use client";

import React from "react";
import Link from "next/link";
import styles from "./styles/navBar.module.css";

type PageLinkPropType = {
  title: string;
  link: string;
};

const PageLink = ({ title, link }: PageLinkPropType) => {
  return (
    <li className={styles.list}>
      <Link href={link} className={styles.pageLink}>
        {title}
      </Link>
    </li>
  );
};

export default PageLink;
