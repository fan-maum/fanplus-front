import Link from 'next/link';

export type BoardItemType = {
  icon: string;
  title: string;
  link: string;
  onClickLocalStore: () => void;
};

const CommunityBoardItem = ({ icon, title, link, onClickLocalStore }: BoardItemType) => {
  return (
    <Link
      href={link}
      css={{
        display: 'flex',
        borderBottom: '1px solid #d9d9d9',
        margin: '5px 0px',
        padding: '5px 5px 10px',
      }}
      onClick={onClickLocalStore}
    >
      <img src={icon} css={{ width: '84px', height: '84px' }} alt={title} />
      <p css={{ margin: 'auto 5px', fontWeight: '500' }}>{title}</p>
    </Link>
  );
};

export default CommunityBoardItem;
