import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import MainBookmarkMenu from './MainBookmarkMenu';
import MainMenuList from './MainMenuList';
import { UrlLangType } from '@/types/common';
import { translateUrlLangToServerLang } from '@/hooks/useLanguage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { BookmarkItemType } from './MainAsideCategory';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';

interface MainAsideMenusProps {
  urlLang: UrlLangType;
  bookmarks: BookmarkItemType[];
}

const MainAsideMenus = ({ urlLang, bookmarks }: MainAsideMenusProps) => {
  const router = useRouter();
  const serverLang = translateUrlLangToServerLang(urlLang);
  const texts = communityLayoutTexts[urlLang];
  const handleAllPostsBoardOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked board');
  };

  return (
    <MenuWrapper>
      <div className="title">{texts.fanplusCommunity}</div>
      <MainBookmarkMenu urlLang={urlLang} bookmarks={bookmarks} bookmarkTitle={texts.bookmark} />
      <ScreenAllWrapper>
        <Link
          className="menu-title"
          data-active={router.pathname === '/[locale]/community'}
          href={`/${urlLang}/community`}
          onClick={handleAllPostsBoardOnClick}
        >
          <span className="title-top-menu">{texts.asideMenus[0]}</span>
          {/* {topMenu.hasNewPost && ( */}
          <span className="new">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
          {/* )} */}
        </Link>
        <BookmarkButton isBookmarked={false} />
      </ScreenAllWrapper>
      <MainMenuList
        serverLang={serverLang}
        bookmarks={bookmarks}
        freeBoardText={texts.asideMenus[1]}
      />
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
      color: ${colors.primary[500]};
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

const ScreenAllWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid ${colors.gray[200]};
`;
