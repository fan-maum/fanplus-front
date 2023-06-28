import React from 'react';
import PageLink from './PageLink';

///// 투표, 커뮤니티로 가는 link Contaier

const PageLinkContainer = () => {
  return (
    <div className="PageLinkContainer" style={{ display: 'flex', alignItems: 'center' }}>
      <PageLink title="투표" onClick={() => {}}></PageLink>
      <PageLink title="커뮤니티" onClick={() => {}}></PageLink>
    </div>
  );
};

export default PageLinkContainer;
