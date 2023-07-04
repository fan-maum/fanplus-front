import Link from 'next/link';
import styles from './styles/navBar.module.css';
import { css } from '@emotion/react';

type PageLinkPropType = {
  title: string;
  link: string;
};

const listStyle = css`
  flex-direction: column;
  list-style-type: none;
  float: left;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-stretch: 100%;
  font-weight: 500;
  color: rgb(102, 102, 102);
  letter-spacing: normal;
`;

const PageLink = ({ title, link }: PageLinkPropType) => {
  return (
    <li css={listStyle}>
      <Link href={link} className={styles.pageLink}>
        {title}
      </Link>
    </li>
  );
};

export default PageLink;
