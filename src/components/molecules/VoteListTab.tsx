export interface VoteListTabProps {
  tabs: string[] | { value: string; label: string }[];
  state: [string, React.Dispatch<React.SetStateAction<any>>];
}

const VoteListTab = ({
  tabs,
  state: [tabValueState, setTabValueState],
  ...props
}: VoteListTabProps) => {
  return <>tab</>;
};

export default VoteListTab;
