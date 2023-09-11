import { UnstyledButton, UnstyledButtonProps } from '@/components/atoms';
import Image from 'next/image';

export interface LikesButtonProps extends UnstyledButtonProps {
  gap?: number;
  padding?: string | number;
  text?: string;
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
        }}
        {...props}
      >
        <Image src={'/icons/icon_comment.svg'} width={35} height={35} alt="comment" />
        <div
          css={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: '#101010',
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          {text}
        </div>
      </UnstyledButton>
    </div>
  );
}
