import { BoardCategoryItemType } from '@/types/community';
import SearchScrollTabBar from './SearchScrollTabBar';

export type CommunityBoardFilterTabProps = {
  searchCategoryTabs: BoardCategoryItemType[];
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
};

const CommunityBoardFilterTab = ({
  searchCategoryTabs,
  searchTabState,
}: CommunityBoardFilterTabProps) => {
  return (
    <>
      <SearchScrollTabBar tabs={searchCategoryTabs} searchTabState={searchTabState} />
    </>
  );
};

export default CommunityBoardFilterTab;
