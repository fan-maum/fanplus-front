export interface VoteTemplateProps {
  voteListTab: React.ReactNode;
  voteList: React.ReactNode;
  votePagination: React.ReactNode;
}

function VoteTemplate({ ...props }: VoteTemplateProps) {
  const { voteListTab, voteList, votePagination } = props;
  return (
    <div css={{ padding: '25px 0 110px 0' }}>
      {voteListTab}
      {voteList}
      {votePagination}
    </div>
  );
}

export default VoteTemplate;
