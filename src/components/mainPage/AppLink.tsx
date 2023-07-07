import styles from './styles/AppLink.module.css';
import { css } from '@emotion/react';

export type AppLinkType = {
  icon: string;
  storeName: string;
  storeLink: string;
  bgColor: string;
  fontColor: string;
};

const AppLink = ({ icon, storeName, storeLink, bgColor, fontColor }: AppLinkType) => {
  return (
    <a href={storeLink} target="_blank" className={styles.a} id={storeName}>
      <div
        className={styles.container}
        css={{
          backgroundColor: bgColor,
          color: fontColor,
          ':hover': {
            backgroundColor: fontColor,
            color: bgColor,
          },
        }}
      >
        <img src={icon} alt="" className={styles.icon} />
        <p>{storeName}</p>
      </div>
    </a>
  );
};

export default AppLink;
