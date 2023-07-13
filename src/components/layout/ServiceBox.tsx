import Link from 'next/link';
import styles from './styles/ServiceBox.module.css';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

type PageLinkPropType = {
  title: string;
  link: string;
};

const ServiceBox = ({ title, link }: PageLinkPropType) => {
  const path = useRouter().pathname;
  const picked = path === link ? css('color: rgb(0, 0, 0);') : css('');
  return (
    <li className={styles.list}>
      <Link href={link} className={styles.pageLink} css={picked}>
        {title}
      </Link>
    </li>
  );
};

export default ServiceBox;
