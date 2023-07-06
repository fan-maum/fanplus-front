export interface VoteTemplateProps {
  voteListTab: React.ReactNode;
  voteList: React.ReactNode;
}

function VoteTemplate({ ...props }: VoteTemplateProps) {
  const { voteListTab, voteList } = props;
  return (
    <div css={{ padding: '25px 0 110px 0' }}>
      {voteListTab}
      {voteList}
    </div>
  );
}

export default VoteTemplate;
