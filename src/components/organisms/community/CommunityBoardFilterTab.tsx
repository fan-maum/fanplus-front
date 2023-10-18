import { BoardCategoryItemType } from '@/types/community';
import SearchScrollTabBar from './SearchScrollTabBar';

export type CommunityBoardFilterTabProps = {
  searchCategoryTabs: BoardCategoryItemType[];
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
  refetchBoardResultData: () => void;
};

const CommunityBoardFilterTab = ({
  searchCategoryTabs,
  searchTabState,
  refetchBoardResultData,
}: CommunityBoardFilterTabProps) => {
  return (
    <>
      <SearchScrollTabBar
        tabs={searchCategoryTabs}
        searchTabState={searchTabState}
        refetchBoardResultData={refetchBoardResultData}
      />
    </>
  );
};

export default CommunityBoardFilterTab;
