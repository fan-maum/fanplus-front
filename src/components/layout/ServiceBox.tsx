import Link from 'next/link';
import styles from './styles/ServiceBox.module.css';
import { css } from '@emotion/react';

type PageLinkPropType = {
  title: string;
  link: string;
};

const ServiceBox = ({ title, link }: PageLinkPropType) => {
  return (
    <li className={styles.list}>
      <Link href={link} className={styles.pageLink}>
        {title}
      </Link>
    </li>
  );
};

export default ServiceBox;