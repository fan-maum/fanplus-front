"use client";

import React from "react";
import PageLink from "./PageLink";
import LanguageContainer from "./LanguageContainer";
import styles from "./styles/navBar.module.css";
import { useTranslations } from "next-intl";

const PageLinkContainer = () => {
  const title = useTranslations("NavBar");

  return (
    <div className={styles.pageLinkContainer}>
      <ul className={styles.ul}>
        <PageLink title={title("vote")} link="/votes" />
        <PageLink title={title("community")} link="/community" />
      </ul>
      <ul className={styles.ul}>
        <PageLink title={title("aboutUs")} link="/" />
        {title("recruit") && (
          <PageLink
            title={title("recruit")}
            link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
          />
        )}
        <PageLink title={title("business")} link="https://fanplus.co.kr/partnership/" />
        <PageLink title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageContainer currLang={title("language")} />
      </ul>
    </div>
  );
};

export default PageLinkContainer;
