import Link from 'next/link';

export type BoardItemType = {
  icon: string;
  title: string;
  link: string;
  postCount: string;
  onClickLocalStore: () => void;
};

const CommunityBoardItem = ({ icon, title, link, postCount, onClickLocalStore }: BoardItemType) => {
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
      <div css={{ margin: 'auto 5px', fontWeight: '600', lineHeight: '24px' }}>
        <p css={{ color: '#101010', letterSpacing: '0.18px', fontSize: '18px' }}> {title} </p>
        <p css={{ color: '#999', letterSpacing: '0.16px', fontSize: '16px' }}>{postCount}</p>
      </div>
    </Link>
  );
};

export default CommunityBoardItem;
