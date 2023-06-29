'use client';

import React from 'react';
import Link from 'next/link';
import styles from './styles/navBar.module.css';
import { useRouter } from 'next/navigation';

type PageLinkPropType = {
  title: string;
  link: string;
  // onClick: MouseEventHandler<HTMLElement>;
};

const PageLink = ({ title, link }: PageLinkPropType) => {
  const router = useRouter();

  return (
    <li className={styles.list}>
      <Link href={link} className={styles.pageLink}>
        {title}
      </Link>
    </li>
  );
};

export default PageLink;
