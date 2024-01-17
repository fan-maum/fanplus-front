import React from 'react';
import styled from '@emotion/styled';
// import BoardTitleBookMark from './BoardTitleBookMark';
import {
  BookmarksItemType,
  MultiBoardsInquiryItemType,
  MultiBoardsInquiryResponseType,
} from '@/types/community';
import { useQuery } from 'react-query';
import { getCookie } from '@/utils/Cookie';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { getBookmarks } from '@/api/Community';

type BoardMobileTitleProps = {
  boardInfo: MultiBoardsInquiryItemType;
};
const BoardMobileTitle = ({ boardInfo }: BoardMobileTitleProps) => {
  const userId = getCookie('user_id');
  const urlLang = useUrlLanguage();

  const { data } = useQuery(['bookmarks', { userId, urlLang }], () =>
    getBookmarks(userId, urlLang)
  );
  const bookmarks = data ?? [];
  // const isBookmarked = Boolean(
  //   bookmarks.find((bookmark: BookmarksItemType) => bookmark.BOARD_IDX === boardInfo.IDX)
  // );

  return (
    <BoardMobileTitleWrapper>
      {<h1 className="table-title">{boardInfo?.TITLE}</h1>}
      {/* <BoardTitleBookMark isBookmarked={isBookmarked} menuID={menuID} /> */}
    </BoardMobileTitleWrapper>
  );
};

export default BoardMobileTitle;

const BoardMobileTitleWrapper = styled.div`
  .table-title {
    color: var(--color-primary-text);
    font-size: 22px;
    font-weight: bold;
    padding-right: 4px;
    margin-bottom: 2px !important;
  }
`;
