import { Popover } from '@mantine/core';
import IconHorizontalMore from '@/components/atoms/IconHorizontalMore';
import { deleteCommentResult } from '@/api/Community';

type CommentPopoverProps = {
  identity: string;
  comment_idx: string;
};
export default function CommentPopover({ identity, comment_idx }: CommentPopoverProps) {
  const DeleteOnClick = async () => {
    const res = await deleteCommentResult(identity, comment_idx);
  };
  return (
    <Popover
      width={60}
      position="bottom-end"
      shadow="none"
      styles={() => ({
        dropdown: {
          padding: 0,
          border: '1px solid #d9d9d9',
          borderRadius: '6px',
        },
      })}
    >
      <Popover.Target>
        <button
          css={{
            display: 'flex',
            outline: 'none',
            border: 'none',
            background: 'none',
          }}
        >
          <IconHorizontalMore />
        </button>
      </Popover.Target>
      <Popover.Dropdown>
        <ul
          css={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '60px',
            '& > li': {
              padding: '8px 16px',
              color: '#101010',
              fontSize: 14,
              fontWeight: 400,
              cursor: 'pointer',
            },
            '& > li:nth-of-type(1)': {
              borderBottom: '1px solid #d9d9d9',
            },
          }}
        >
          <li
            onClick={() => {
              // eslint-disable-next-line no-console
              console.log('edit');
            }}
          >
            수정
          </li>
          <li onClick={DeleteOnClick}>삭제</li>
        </ul>
      </Popover.Dropdown>
    </Popover>
  );
}
