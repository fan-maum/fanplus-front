export interface VoteTemplateProps {
  voteListTab: React.ReactNode;
  voteList: React.ReactNode;
  votePagination: React.ReactNode;
}

function VoteTemplate({ ...props }: VoteTemplateProps) {
  const { voteListTab, voteList, votePagination } = props;
  return (
    <div>
      {voteListTab}
      {voteList}
      {votePagination}
    </div>
  );
}

export default VoteTemplate;
