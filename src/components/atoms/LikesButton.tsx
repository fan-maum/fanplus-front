import {
  Avatar,
  AvatarProps,
  Stack,
  UnstyledButton,
  UnstyledButtonProps,
} from '@/components/atoms';
import Image from 'next/image';

export interface LikesButtonProps extends UnstyledButtonProps {
  buttonSize?: 'medium' | 'large';
  gap?: number;
  padding?: string | number;
  text?: string;
  alreadyLike?: string;
  recommendYN?: string;
  onClick?: () => void;
}

export default function LikesButton({
  buttonSize = 'large',
  text,
  gap,
  padding,
  alreadyLike,
  recommendYN,
  ...props
}: LikesButtonProps) {
  return (
    <div>
      <UnstyledButton
        css={{
          display: 'flex',
          flexDirection: 'row',
          gap: gap || 6,
          padding: padding || '16px 30px',
          borderRadius: 5,
          border: buttonSize === 'large' ? '2px solid #D9D9D9' : 'none',
        }}
        {...props}
      >
        <Image
          src={'/icons/icon_likes.svg'}
          width={buttonSize === 'large' ? 20 : 16}
          height={buttonSize === 'large' ? 20 : 16}
          alt="likes"
        />
        <div
          css={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: '#999',
            ...SIZE_VARIANTS[buttonSize],
          }}
        >
          {text}
        </div>
      </UnstyledButton>
    </div>
  );
}

const SIZE_VARIANTS = {
  large: {
    fontSize: '20px',
    fontWeight: '600',
  },
  medium: {
    fontSize: '16px',
    fontWeight: '400',
  },
};
