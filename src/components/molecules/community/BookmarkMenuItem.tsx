import BookmarkButton from '@/components/atoms/BookmarkButton';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface BookmarkMenuItemProps {
  menuInfo: {
    title: string;
    slug: string;
    hasNewPost: boolean;
  };
}
const BookmarkMenuItem = ({ menuInfo }: BookmarkMenuItemProps) => {
  const router = useRouter();
  const { title, slug, hasNewPost } = menuInfo;
  const { boardSlug } = router.query;
  const isActive = boardSlug === slug;
  const href = '/[boardSlug]';
  const as = `/${slug}`;

  return (
    <BookmarkMenuItemWrapper>
      <Link className="bookmark-link" href={href} as={as} data-status={isActive}>
        <span>{title}</span>
        {hasNewPost && (
          <span className="new-post-icon">
            <img src="/icons/icon_new.svg" alt="new-icon" />
          </span>
        )}
      </Link>
      <BookmarkButton />
    </BookmarkMenuItemWrapper>
  );
};

export default BookmarkMenuItem;

const BookmarkMenuItemWrapper: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

  .new-post-icon {
    padding-left: 5px;
  }

  .bookmark-link {
    color: var(--color-light-80);

    &[data-status='true'] {
      color: var(--color-primary);
    }
  }
`;
