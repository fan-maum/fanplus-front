import { FooterTextType } from '@/types/textTypes';
import Image from 'next/image';
import styles from './styles/Footer.module.css';

const Footer = ({ texts }: { texts: FooterTextType }) => {
  return (
    <div className={styles.container}>
      <div className={styles.area}>
        <div className={styles.textBox}>
          <h5>{texts.customerService}</h5>
          <div className={styles.emailBox}>
            <a href="mailto:cs@fanmaum.com">
              <h3>cs@fanmaum.com</h3>
              <button>{texts.emailButton}</button>
            </a>
          </div>
          <div className={styles.policies}>
            <a href={texts.termsOfServiceLink} target="_blank">
              {texts.termsOfService}
            </a>
            <p>|</p>
            <a href={texts.privacyPolicyLink} target="_blank">
              {texts.privacyPolicy}
            </a>
          </div>
          <p>{texts.introduction}</p>
          <p>{texts.copyright}</p>
        </div>
        <div className={styles.downloadBox}>
          <a
            href="https://play.google.com/store/apps/details?id=com.photocard.allstar"
            target="_blank"
          >
            <Image
              src="/images/google_play_badge.png"
              alt="google-play-link"
              width={142}
              height={48}
            />
          </a>
          <a
            href="https://apps.apple.com/kr/app/%ED%8C%AC%ED%94%8C%EB%9F%AC%EC%8A%A4/id1448805815"
            target="_blank"
          >
            <Image src="/images/app_store_badge.png" alt="app-store-link" width={142} height={48} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
