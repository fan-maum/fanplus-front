import PageLink from './PageLink';
import LanguageContainer from './LanguageContainer';
import styles from './styles/navBar.module.css';
import { css } from '@emotion/react';

const stylePageLinkContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 1;
`;
const styleUl = css`
  padding: 10px;
`;
const styleUl2 = css`
  display: flex;
  padding: 10px;
  @media (max-width: 991px) {
    display: none;
  }
`;

const PageLinkContainer = () => {
  return (
    <div css={stylePageLinkContainer}>
      <ul css={styleUl}>
        <PageLink title="투표" link="/votes" />
        <PageLink title="커뮤니티" link="/community" />
      </ul>
      <ul css={styleUl2}>
        <PageLink title="서비스 소개" link="/" />
        <PageLink
          title="채용"
          link="https://www.wanted.co.kr/search?query=%ED%8C%AC%EB%A7%88%EC%9D%8C"
        />
        <PageLink title="제휴 문의" link="https://fanplus.co.kr/partnership/" />
        <PageLink title="FAQ" link="https://fanplus.co.kr/faq_new/" />
        <LanguageContainer currLang="한국어" />
      </ul>
    </div>
  );
};

export default PageLinkContainer;
