import IconBookmark from './IconBookmark';

interface BookmarkButtonProps {
  className?: string;
}

export default function BookmarkButton({ className = 'bookmark-icon' }: BookmarkButtonProps) {
  let viewerHasBookmarked = true;
  const handleBookmarkButtonClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  return (
    <div data-role="북마크-버튼" className={className}>
      <IconBookmark isActive={viewerHasBookmarked} onClick={handleBookmarkButtonClick} />
    </div>
  );
}
