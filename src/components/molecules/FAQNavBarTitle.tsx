const FAQNavBarTitle = ({
  selected,
  title,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      css={[
        {
          padding: '10px 15px',
          marginRight: 10,
          cursor: 'pointer',
          '@media screen and (max-width: 768px)': {
            padding: '6px 6px',
            marginRight: 6,
          },
        },
        selected ? { borderBottom: '2px solid #ff5656' } : '',
      ]}
    >
      <h2>{title}</h2>
    </div>
  );
};
export default FAQNavBarTitle;
