"use client";
import React from "react";
import styles from "./styles/navBar.module.css";
import MainLogo from "./MainLogo";
import PageLinkContainer from "./PageLinkContainer";

const NavBar = () => {
  return (
    <>
      <div className={styles.navArea}>
        <div className={styles.navBarContainer}>
          <MainLogo />
          <PageLinkContainer />
        </div>
      </div>
      <div className={styles.topBackground} />
    </>
  );
};

export default NavBar;
