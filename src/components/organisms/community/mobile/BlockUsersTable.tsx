import MyPostArticle from '@/components/molecules/community/mobile/MyPostArticle';
import BlockUsersPagination from './BlockUsersPagination';
import CommunityMyPostNoPost from '../CommunityMyPostNoPost';
import { communityBoardTexts } from '@/texts/communityBoardTexts';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { blockUserListItemType } from '@/types/community';

type BlockUsersTableProps = {
  blockUsers: Array<blockUserListItemType>;
  blockUsersCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
};

const BlockUsersTable = ({
  blockUsers,
  blockUsersCount,
  handlePageChange,
}: BlockUsersTableProps) => {
  const urlLang = useUrlLanguage();
  const boardTexts = communityBoardTexts[urlLang];
  if (blockUsersCount === 0) {
    return <CommunityMyPostNoPost texts={boardTexts.noBlockUserTexts} />;
  }
  return (
    <div>
      <ul>
        {blockUsers.map((blockUser) => (
          <MyPostArticle key={blockUser.IDX} blockUserItem={blockUser} />
        ))}
      </ul>
      <BlockUsersPagination totalCount={blockUsersCount} handlePageChange={handlePageChange} />
    </div>
  );
};

export default BlockUsersTable;
