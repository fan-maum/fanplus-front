import IconBookmark from '@/components/atoms/IconBookmark';
import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import { ReactNode, useState } from 'react';

interface BookmarkListToggleProps {
  headerTitle: string;
  children: ReactNode;
  isActive: boolean;
}
const BookmarkListToggle = ({ headerTitle, children, isActive }: BookmarkListToggleProps) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const menuIcon = isOpen ? 'up' : 'down';
  return (
    <BookmarkListToggleWrapper>
      <div className="title-wrapper" onClick={() => toggleIsOpen(!isOpen)}>
        <span className="bookmark-title">
          {headerTitle}
          <IconBookmark isBookmarked={isActive} width="16" height="16" />
        </span>
        <div className="icon">
          <img src={`/icons/icon_arrow_${menuIcon}.svg`} alt="메뉴 열기버튼" />
        </div>
      </div>
      <ToggleWrapper data-open={isOpen}>{children}</ToggleWrapper>
    </BookmarkListToggleWrapper>
  );
};

export default BookmarkListToggle;

const BookmarkListToggleWrapper = styled.div`
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    padding: 0 12px 0 16px;
    cursor: pointer;
    border-bottom: 1px solid ${colors.gray[200]};
  }

  .bookmark-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${colors.gray[1000]};
    font-weight: 500;
  }

  .icon {
    display: flex;
    width: 16px;
    transform: translateX(5px);
    margin-right: 6px;

    > img {
      width: 16px;
    }
  }

  svg {
    width: inherit;
    height: inherit;
    vertical-align: text-top;
    cursor: pointer;
    margin-left: 2px;
  }
`;

const ToggleWrapper = styled.div`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);

  &[data-open='true'] {
    max-height: 1000px;
    transition: max-height 1s ease-in-out;
    border-bottom: 1px solid ${colors.gray[200]};
  }
`;
