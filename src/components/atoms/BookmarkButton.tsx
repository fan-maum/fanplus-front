import IconBookmark from './IconBookmark';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  className?: string;
  width?: string;
  height?: string;
}

export default function BookmarkButton({
  isBookmarked,
  className = 'bookmark-icon',
  width,
  height,
}: BookmarkButtonProps) {
  const handleBookmarkButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  return (
    <div
      data-role="북마크-버튼"
      className={className}
      css={{ display: 'flex', height: height }}
      onClick={handleBookmarkButtonClick}
    >
      <IconBookmark isBookmarked={isBookmarked} width={width} height={height} />
    </div>
  );
}
