import IconArrowDown from '@/components/atoms/IconArrowDown';
import IconFilter from '@/components/atoms/IconFilter';

type OwnPropType = {
  onClick: () => void;
  language: string;
  tooltipText: string;
};

const CommunityBoardLangSelector = ({ onClick, language, tooltipText }: OwnPropType) => {
  return (
    <div
      css={{
        position: 'relative',
        ':hover': { '.tooltip': { visibility: 'visible' } },
      }}
    >
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
      <span
        className="tooltip"
        css={{
          position: 'absolute',
          top: '27px',
          right: '21px',
          whiteSpace: 'nowrap',
          visibility: 'hidden',
          padding: '6px 9px',
          borderRadius: '12px',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: '12px',
          '::after': {
            content: "' '",
            position: 'absolute',
            right: '20%',
            top: '-12px',
            border: '6px solid',
            borderColor: 'transparent transparent #000 transparent',
          },
        }}
      >
        {tooltipText}
      </span>
    </div>
  );
};

export default CommunityBoardLangSelector;
