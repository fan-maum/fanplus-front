import IconBookmark from './IconBookmark';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  className?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}

export default function BookmarkButton({
  isBookmarked,
  className = 'bookmark-icon',
  width,
  height,
  onClick,
}: BookmarkButtonProps) {
  return (
    <div
      data-role="북마크-버튼"
      className={className}
      css={{ display: 'flex', height: height }}
      onClick={onClick}
    >
      <IconBookmark isBookmarked={isBookmarked} width={width} height={height} />
    </div>
  );
}
