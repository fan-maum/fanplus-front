import styled from '@emotion/styled';
import BookmarkButton from '@/components/atoms/BookmarkButton';
import { colors } from '@/styles/CommunityColors';
import { getCookie } from '@/utils/Cookie';
import { useUrlLanguage } from '@/hooks/useLanguage';

type BoardMobileTitleProps = {};
const BoardMobileTitle = ({}: BoardMobileTitleProps) => {
  const userId = getCookie('user_id');
  const urlLang = useUrlLanguage();

  return (
    <BoardMobileTitleWrapper>
      {/* {<h1 className="table-title">{boardInfo?.TITLE}</h1>} */}
      {/* <BoardTitleBookMark isBookmarked={isBookmarked} menuID={menuID} /> */}
    </BoardMobileTitleWrapper>
  );
};

export default BoardMobileTitle;

const BoardMobileTitleWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    max-width: 48%;
  }
  .table-title {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.gray[1000]};
    word-break: keep-all;
  }
`;
