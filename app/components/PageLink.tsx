import React, { MouseEventHandler } from 'react';
import Link from 'next/link';
import styles from './styles/navBar.module.css';

type PageLinkPropType = {
  title: string;
  onClick: MouseEventHandler<HTMLElement>;
};

const PageLink = ({ title, onClick }: PageLinkPropType) => {
  const link = title === '투표' ? 'votes' : 'community';
  return (
    <Link href={'/' + link} className={styles.pageLink}>
      {title}
    </Link>
  );
};

export default PageLink;
