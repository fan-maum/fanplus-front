import React from 'react';
import PageLink from './PageLink';
import LanguageContainer from './LanguageContainer';
import { css } from '@emotion/react';

const SideBar = () => {
  let sideBarStyle = css`
    width: 300px;
    height: 100vh;
    background-color: white;
    z-index: 10;
  `;
  let modalStyle = css`
    // display: none;
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
  `;

  return (
    <div css={modalStyle}>
      <ul css={sideBarStyle}>
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

export default SideBar;
