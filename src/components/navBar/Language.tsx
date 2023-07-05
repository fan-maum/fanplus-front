import styles from './styles/navBar.module.css';
import Link from 'next/link';
import { css } from '@emotion/react';

const languageBox = css({
  display: 'flex',
  width: '210px',
  height: '40px',
  lineHeight: '40px',
  paddingLeft: '16px',
  borderBottom: '1px solid grey',
  alignItems: 'center',
});

const languageLink = css({
  textDecoration: 'none',
  color: 'rgb(102, 102, 102)',
  margin: '3px',
});

type PropType = {
  language: string;
  href: string;
};

const Language = ({ language, href }: PropType) => {
  return (
    <div css={languageBox}>
      <Link href={href} css={languageLink}>
        {language}
      </Link>
    </div>
  );
};

export default Language;
