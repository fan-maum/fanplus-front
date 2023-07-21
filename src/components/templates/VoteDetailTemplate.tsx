export interface VoteDetailTemplateProps {
  voteDetailHeader: React.ReactNode;
  voteDetailInfo: React.ReactNode;
  voteDetailPrizeList: React.ReactNode;
  voteDetailList: React.ReactNode;
}

function VoteDetailTemplate({ ...props }: VoteDetailTemplateProps) {
  const { voteDetailHeader, voteDetailInfo, voteDetailPrizeList, voteDetailList } = props;
  return (
    <div
      css={{
        position: 'relative',
        maxWidth: '768px',
        minWidth: '360px',
        padding: 0,
        overflowY: 'auto',
        height: '100vh',
        width: '100%',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      {voteDetailHeader}
      {voteDetailInfo}
      {voteDetailPrizeList}
      {voteDetailList}
    </div>
  );
}

export default VoteDetailTemplate;
