import { GetServerSideProps } from 'next';
import { getCommunityBoardCategoryData } from '@/api/Community';
import { CommunityBoardCategoryResponseType } from '@/types/community';

export type BoardCategoryProps = {
  boardCategoryData: CommunityBoardCategoryResponseType;
};

const CommunityBoardFilterTab = ({ boardCategoryData }: BoardCategoryProps) => {
  console.log(boardCategoryData);

  return <>test</>;
};

export const getServerSideProps: GetServerSideProps<{
  boardCategoryData: CommunityBoardCategoryResponseType;
}> = async (context) => {
  const userId = '008badb6f4296505f6741654eb98d11f324b4dc5f2ee396a5f68e6c18d4872ab';
  const boardCategoryData = await getCommunityBoardCategoryData(userId);
  return {
    props: { boardCategoryData },
  };
};

export default CommunityBoardFilterTab;
