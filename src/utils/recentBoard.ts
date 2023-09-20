import type { BoardListItemType } from '@/types/community';

export const getStorageRecentBoardDatas = () => {
  const storageBoardDatas = window.localStorage.getItem('recent_board_datas');
  return !!storageBoardDatas ? (JSON.parse(storageBoardDatas) as Array<BoardListItemType>) : [];
};

export const updateStorageRecentBoardList = (boardItem: BoardListItemType) => {
  const storageBoardDataObject = getStorageRecentBoardDatas();
  for (let i = 0; i < storageBoardDataObject.length; i++) {
    if (storageBoardDataObject[i].BOARD_IDX === boardItem.BOARD_IDX) {
      storageBoardDataObject.splice(i, 1);
      break;
    }
  }
  storageBoardDataObject.unshift(boardItem);
  const recent10BoardDatas = storageBoardDataObject.slice(0, 10);
  window.localStorage.setItem('recent_board_datas', JSON.stringify(recent10BoardDatas));
};
