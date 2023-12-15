import { useGetMainMenuCategoryQuery } from '@/server/query';
import { ServerLangType } from '@/types/common';
import { BoardListItemType } from '@/types/community';

interface MainMenuListProps {
  serverLang: ServerLangType;
}

const MainMenuList = ({ serverLang }: MainMenuListProps) => {
  const { data, isFetching, isFetched } = useGetMainMenuCategoryQuery(serverLang);
  const menus = data?.RESULTS.DATAS.BOARD_LIST;
  return (
    <div>
      <ul>
        {/* {isFetching && <>...loading</>} */}
        <li key={data?.RESULTS.DATAS.BOARD_LIST[0]?.BOARD_IDX}>
          {data?.RESULTS.DATAS.BOARD_LIST[0].BOARD_TITLE}
        </li>
        <li key={data?.RESULTS.DATAS.BOARD_LIST[2]?.BOARD_IDX}>
          {data?.RESULTS.DATAS.BOARD_LIST[2].BOARD_TITLE}
        </li>
        {data?.RESULTS.DATAS.BOARD_LIST.map((menu) => (
          <li key={menu.BOARD_IDX}>{menu.BOARD_TITLE}</li>
        ))}
      </ul>
      {/* <div>BEST 인기글 (실시간)</div>
      <div>공지사항</div>
      <div>자유게시판</div> */}
    </div>
  );
};

export default MainMenuList;

// BEST 인기글 실시간
// 공지사항
// 자유게시판
//     - 건의사항
//     - 자유게시판
//     - 팬플 지식 in
//     - 팬플러스 광고 사진
//     - 팬픽
//     - 팬픽 공지사항
