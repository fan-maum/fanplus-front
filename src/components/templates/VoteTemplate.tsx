export interface VoteTemplateProps {
  voteListTab: React.ReactNode;
  voteList: React.ReactNode;
}

function VoteTemplate({ ...props }: VoteTemplateProps) {
  const { voteListTab, voteList } = props;
  return (
    <div css={{ marginTop: 25 }}>
      {voteListTab}
      {voteList}
    </div>
  );
}

export default VoteTemplate;
