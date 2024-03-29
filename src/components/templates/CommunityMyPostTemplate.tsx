import type { MyPostPageProps } from '@/pages/[locale]/community/myPost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useRouter } from 'next/router';
import BoardMobileTitle from '../molecules/community/mobile/BoardMobileTitle';
import { MyPostTabBar } from '../molecules/community/mobile/MyPostTabBar';
import { useState } from 'react';
import BlockUsersTable from '../organisms/community/mobile/BlockUsersTable';
import { colors } from '@/styles/CommunityColors';
import styled from '@emotion/styled';
import MyPostArticleTable from '../organisms/community/MyPostArticleTable';
import { useQuery } from 'react-query';
import { getBlockUsers } from '@/api/Community';

const CommunityMyPostTemplate = ({
  urlLang,
  userId,
  user_idx,
  communityMyPostData,
}: MyPostPageProps) => {
  const router = useRouter();
  const texts = communityBoardTexts[urlLang];
  const boardInfo = communityMyPostData.BOARD_INFO;
  const postList = communityMyPostData.POST_LIST;
  let position = 0;
  const count = 20;

  const { data } = useQuery(['blockUsers', { userId, user_idx, position, count }], () =>
    getBlockUsers(userId, user_idx, position, count)
  );
  const blockUsersCount = Number(data?.RESULTS.DATAS.list.length);
  const blockUsers = data?.RESULTS.DATAS.list ?? [];

  const [myPostTabBar, setMyPostTabBar] = useState((router.query.tab as string) || 'myPost');

  const isPostExist = !(postList.length === 0 && (!router.query.page || router.query.page === '1'));

  const handlePageChange = (selectedItem: { selected: number }) => {
    router.push({ query: { ...router.query, page: selectedItem.selected + 1 } });
  };

  return (
    <div css={{ minWidth: 810, '@media(max-width:960px)': { width: '100%', minWidth: 320 } }}>
      <BoardMobileTitle boardTitle={texts.bottomTabBar.myPost} onClickBack={() => router.back()} />
      <MyPostTabBar
        tabTitles={{ firstTab: texts.myPostTab.myPost, secondTab: texts.myPostTab.blockUser }}
        tabItems={['myPost', 'blockUser']}
        tabBar={myPostTabBar}
        setTabBar={setMyPostTabBar}
      />
      <div css={{ display: 'block', '@media(max-width:768px)': { display: 'none' } }}>
        <MyPostArticleTable
          isPostExist={isPostExist}
          postList={postList}
          VIEW_POSSIBLE_PAGE={boardInfo.VIEW_POSSIBLE_PAGE}
          handlePageChange={handlePageChange}
        />
      </div>
      <div css={{ display: 'none', '@media(max-width:768px)': { display: 'block' } }}>
        {myPostTabBar === 'myPost' ? (
          <MyPostArticleTable
            isPostExist={isPostExist}
            postList={postList}
            VIEW_POSSIBLE_PAGE={boardInfo.VIEW_POSSIBLE_PAGE}
            handlePageChange={handlePageChange}
          />
        ) : (
          <div>
            <BlockUserTitle>
              <span>{texts.blockUserTitle.firstMessage}</span>
              <span className="blockUserCount">{blockUsersCount}</span>
              <span>{texts.blockUserTitle.secondMessage}</span>
            </BlockUserTitle>
            <BlockUsersTable
              blockUsers={blockUsers}
              blockUsersCount={blockUsersCount}
              handlePageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityMyPostTemplate;

const BlockUserTitle = styled.h3`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  margin-top: 10px;

  span {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.gray[1000]};
  }
  .blockUserCount {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.primary[500]};
    padding: 0 2px;
  }
`;
