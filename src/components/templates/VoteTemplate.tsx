export interface VoteTemplateProps {
  voteListTab: React.ReactNode;
  voteList: React.ReactNode;
  votePagination: React.ReactNode;
}

function VoteTemplate({ ...props }: VoteTemplateProps) {
  const { voteListTab, voteList, votePagination } = props;
  return (
    <div css={{ position: 'relative' }}>
      {voteListTab}
      {voteList}
      {votePagination}
    </div>
  );
}

export default VoteTemplate;
