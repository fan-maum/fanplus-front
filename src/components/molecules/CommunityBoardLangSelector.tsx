import IconArrowDown from '../atoms/IconArrowDown';
import IconFilter from '../atoms/IconFilter';

type OwnPropType = {
  onClick: () => void;
  language: string;
};

const CommunityBoardLangSelector = ({ onClick, language }: OwnPropType) => {
  return (
    <div
      css={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
    >
      <IconFilter />
      <span css={{ margin: '0px 5px' }}>{language}</span>
      <IconArrowDown width="11" height="6" strokeWidth="3" />
    </div>
  );
};

export default CommunityBoardLangSelector;
