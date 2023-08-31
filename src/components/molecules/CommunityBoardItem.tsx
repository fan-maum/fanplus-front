import Link from 'next/link';

export type BoardItemType = {
  icon: string;
  title: string;
  link: string;
};

const CommunityBoardItem = ({ icon, title, link }: BoardItemType) => {
  return (
    <Link
      href={link}
      css={{
        display: 'flex',
        borderBottom: '1px solid #d9d9d9',
        margin: '5px 0px',
        padding: '5px 5px 10px',
      }}
      key={title}
    >
      <img src={icon} alt={title} css={{ width: '72px', aspectRatio: '1/1' }} />
      <p css={{ margin: 'auto 5px', fontWeight: '500' }}>{title}</p>
    </Link>
  );
};

export default CommunityBoardItem;
