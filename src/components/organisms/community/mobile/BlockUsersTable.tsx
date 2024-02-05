import MyPostArticle from '@/components/molecules/community/mobile/MyPostArticle';
import BlockUsersPagination from './BlockUsersPagination';

type BlockUsersTableProps = {
  blockUsersCount: number;
  handlePageChange: (selectedItem: { selected: number }) => void;
};

const blockUser = {
  USER: 'test1',
};

export const TestArray = () => {
  return Array.from({ length: 30 }, (_, idx) => (
    <MyPostArticle key={idx} blockUserItem={blockUser} />
  ));
};

const BlockUsersTable = ({ blockUsersCount, handlePageChange }: BlockUsersTableProps) => {
  return (
    <div>
      <ul>
        <TestArray />
      </ul>
      <BlockUsersPagination totalCount={blockUsersCount} handlePageChange={handlePageChange} />
    </div>
  );
};

export default BlockUsersTable;
