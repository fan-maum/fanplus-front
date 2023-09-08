import Image from 'next/image';
import Link from 'next/link';

export type BoardItemType = {
  icon: string;
  title: string;
  link: string;
  onClickLocalStore: () => void;
};

const CommunityBoardItem = ({ icon, title, link, onClickLocalStore }: BoardItemType) => {
  return (
    <>
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
        <div css={{ position: 'relative', height: '84px', aspectRatio: '1/1' }}>
          <Image
            src={icon}
            fill
            sizes={'66px 84px'}
            css={{ width: '100%', height: '100%' }}
            alt={title}
          />
        </div>
        <p css={{ margin: 'auto 5px', fontWeight: '500' }}>{title}</p>
      </Link>
    </>
  );
};

export default CommunityBoardItem;
