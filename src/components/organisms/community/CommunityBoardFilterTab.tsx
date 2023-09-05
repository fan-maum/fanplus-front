import { BoardCategoryItemType } from '@/types/community';
import CustomScrollTabBar from '@/components/atoms/CustomScrollTabBar';

export type CommunityBoardFilterTabProps = {
  searchCategoryTabs: BoardCategoryItemType[];
  searchTabState: [number, React.Dispatch<React.SetStateAction<any>>];
};

const CommunityBoardFilterTab = ({
  searchCategoryTabs,
  searchTabState,
}: CommunityBoardFilterTabProps) => {
  return (
    <>
      <CustomScrollTabBar tabs={searchCategoryTabs} searchTabState={searchTabState} />
    </>
  );
};

export default CommunityBoardFilterTab;
