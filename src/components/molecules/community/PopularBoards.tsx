import PopularBoardItem from './PopularBoardItem';
import { Decreased, Increased, New, NoChange } from './PopularBoardRightItems';

const PopularBoards = ({ title }: { title: string }) => {
  return (
    <div
      css={{
        width: '230px',
        border: '1px solid #d9d9d9',
        borderBottom: 'none',
        position: 'absolute',
        left: 'calc((100% - 768px)/2 - 250px)',
      }}
    >
      <div
        css={{
          width: '100%',
          height: '40px',
          lineHeight: '40px',
          backgroundColor: '#f8f8f9',
          textAlign: 'center',
          color: '#101010',
          fontSize: '16px',
          fontWeight: '600',
        }}
      >
        {title}
      </div>
      <PopularBoardItem
        rank={1}
        boardName="bts"
        boardIndex={1}
        rightItem={<Increased rankChange={20} />}
      />
      <PopularBoardItem
        rank={2}
        boardName="bts"
        boardIndex={1}
        rightItem={<Decreased rankChange={20} />}
      />
      <PopularBoardItem rank={3} boardName="bts" boardIndex={1} rightItem={<NoChange />} />
      <PopularBoardItem rank={4} boardName="bts" boardIndex={1} rightItem={<New />} />
      <PopularBoardItem rank={5} boardName="bts" boardIndex={1} rightItem={<New />} />
      <PopularBoardItem rank={6} boardName="bts" boardIndex={1} rightItem={<New />} />
    </div>
  );
};

export default PopularBoards;
