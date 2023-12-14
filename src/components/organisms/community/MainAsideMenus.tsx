import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import MainBookmarkMenu from './MainBookmarkMenu';
import Link from 'next/link';

const MainAsideMenus = () => {
  return (
    <MenuWrapper>
      <div className="title">팬플러스 커뮤니티</div>
      <MainBookmarkMenu />
      <div>
        <Link
          className="menu-title"
          data-active={boardSlug === topMenu.slug}
          href={`/[boardSlug]`}
          as={`/${topMenu.slug}`}
        >
          <span className="title-top-menu">{topMenu.title}</span>

          {topMenu.hasNewPost && (
            <span className="new">
              <Image
                src="/images/icon/n-badge.svg"
                alt="new-icon"
                title="new-icon"
                width={10}
                height={10}
              />
            </span>
          )}
        </Link>
      </div>
      <div>
        <div>BEST 인기글 (실시간)</div>
        <div>공지사항</div>
        <div>자유게시판</div>
      </div>
    </MenuWrapper>
  );
};

export default MainAsideMenus;

const MenuWrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.gray[200]};
  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: ${colors.gray[20]};
    text-align: center;
    color: ${colors.gray[1000]};
    font-size: 16px;
    font-weight: 600;
  }
  .menu-title {
    white-space: nowrap;
    display: inline-block;
    width: 100%;
    transition: 0.15s;
    cursor: pointer;
    line-height: 15px;
    margin: 0;
    border-bottom: 1px solid var(--color-border);
    padding: 13px 0px;
    color: var(--color-primary-text);

    .title-top-menu {
      font-weight: 500;
      font-size: 15px;
      color: var(--color-dark-10);
    }

    &[data-active='true'] {
      color: var(--color-primary);
    }
  }

  .new {
    margin-left: 4px !important;
    margin-top: 4px !important;
    right: -4px;
    transform: translateY(-1px);
    display: inline-block;
  }
`;
