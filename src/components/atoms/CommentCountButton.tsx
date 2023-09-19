import { UnstyledButton, UnstyledButtonProps } from '@/components/atoms';
import Image from 'next/image';

export interface LikesButtonProps extends UnstyledButtonProps {
  gap?: number;
  padding?: string | number;
  text?: string | number;
  onClick?: () => void;
}

export default function CommentCountButton({ text, gap, padding, ...props }: LikesButtonProps) {
  return (
    <div>
      <UnstyledButton
        css={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: gap || 6,
          padding: padding || '0',
          borderRadius: 5,
          cursor: 'default',
        }}
        {...props}
      >
        <Image src={'/icons/icon_comment.svg'} width={26} height={26} alt="comment" />
        <div
          css={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: '#101010',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {text}
        </div>
      </UnstyledButton>
    </div>
  );
}
