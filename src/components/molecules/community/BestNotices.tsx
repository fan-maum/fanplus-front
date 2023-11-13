import Link from 'next/link';
import BestNoticeItem from './BestNoticeItem';
import { Dispatch, SetStateAction, useState } from 'react';

const BestPosts = () => {
  const [sortMode, setSortMode] = useState('live');
  return (
    <div
      css={{
        width: '328px',
        border: '1px solid #d9d9d9',
        borderBottom: 'none',
        position: 'absolute',
        right: 'calc((100% - 768px)/2 - 350px)',
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f8f8f9',
          color: '#101010',
          font: 'normal 14px/18px Pretendard',
          fontWeight: '600',
          padding: '14px 15px 15px 20px',
        }}
      >
        팬플러스 BEST 소식
        <Link href={'/'} css={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
          더보기
          <span css={{ fontSize: '13px', marginLeft: '2px', fontWeight: '500' }}>{'>'}</span>
        </Link>
      </div>
      <SortBubbles currentSortMode={sortMode} setSortMode={setSortMode} />
      <BestNoticeItem rank={1} boardIndex={1} postIndex={1} postTitle={'sdfsdf'} comments={1} />
      <BestNoticeItem rank={2} boardIndex={1} postIndex={1} postTitle={'sdfsdaaf'} comments={1} />
      <BestNoticeItem rank={3} boardIndex={1} postIndex={1} postTitle={'sdfsfsdf'} comments={1} />
      <BestNoticeItem rank={4} boardIndex={1} postIndex={1} postTitle={'sdfsaaadf'} comments={1} />
    </div>
  );
};

export default BestPosts;

/**
 * 순서 바꾸는 버블 아이템
 */

// TODO: sortMode, text object를 인수로 가지는 Array 생성해서 깔쌈하게 처리하자.

const SortBubbles = ({
  currentSortMode,
  setSortMode,
}: {
  currentSortMode: string;
  setSortMode: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div css={{ padding: '10px 17px 9px' }}>
      <SortBubble
        text="실시간"
        sortMode="live"
        currentMode={currentSortMode}
        onClick={() => {
          setSortMode('live');
        }}
      />
      <SortBubble
        text="주간"
        sortMode="weekly"
        currentMode={currentSortMode}
        onClick={() => {
          setSortMode('weekly');
        }}
      />
      <SortBubble
        text="월간"
        sortMode="monthly"
        currentMode={currentSortMode}
        onClick={() => {
          setSortMode('monthly');
        }}
      />
      <SortBubble
        text="댓글순"
        sortMode="comment"
        currentMode={currentSortMode}
        onClick={() => {
          setSortMode('comment');
        }}
      />
      <SortBubble
        text="추천순"
        sortMode="recommendate"
        currentMode={currentSortMode}
        onClick={() => {
          setSortMode('recommendate');
        }}
      />
    </div>
  );
};

const SortBubble = ({
  text,
  sortMode,
  currentMode,
  onClick,
}: {
  text: string;
  sortMode: string;
  currentMode: string;
  onClick: () => void;
}) => {
  return (
    <button
      css={{
        padding: '3px 6px',
        marginRight: '6px',
        font: 'normal 14px/18px Pretendard',
        fontWeight: sortMode === currentMode ? 600 : 400,
        color: sortMode === currentMode ? '#ff5656' : '#101010',
        backgroundColor: sortMode === currentMode ? '#ffedf1' : '#f1f1f1',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
