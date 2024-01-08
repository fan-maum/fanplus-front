import BookmarkButton from '@/components/atoms/BookmarkButton';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MainBookmarkMenu from './MainBookmarkMenu';
import MainMenuList from './MainMenuList';

const MainAsideMenus = () => {
  const router = useRouter();
  const urlLang = useUrlLanguage();

  return (
    <MenuWrapper>
      <div className="title">팬플러스 커뮤니티</div>
      <MainBookmarkMenu />
      <ScreenAllWrapper>
        <Link
          className="menu-title"
          data-active={router.pathname === '/[locale]/community'}
          href={`/${urlLang}/community/`}
        >
          <span className="title-top-menu">전체글</span>
          <span className="new">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
        </Link>
        <BookmarkButton />
      </ScreenAllWrapper>
      <MainMenuList />
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
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    white-space: nowrap;
    cursor: pointer;
    line-height: 15px;
    margin: 0;

    color: ${colors.gray[1000]};

    .title-top-menu {
      font-weight: 500;
      font-size: 14px;
    }

    &[data-active='true'] {
      color: ${colors.primary[500]};
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

const ScreenAllWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid ${colors.gray[200]};
`;
