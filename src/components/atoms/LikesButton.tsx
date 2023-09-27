import { UnstyledButton, UnstyledButtonProps } from '@/components/atoms';
import IconLikes from './IconLikes';

export interface LikesButtonProps extends UnstyledButtonProps {
  buttonSize?: 'medium' | 'large';
  gap?: number;
  padding?: string | number;
  text?: string;
  alreadyLike?: string;
  likesCount?: number;
  recommended?: string;
  recommendedCount?: number;
  onClick?: () => void;
}

export default function LikesButton({
  buttonSize = 'large',
  text,
  gap,
  padding,
  alreadyLike,
  likesCount,
  recommended,
  recommendedCount,
  ...props
}: LikesButtonProps) {
  const active = alreadyLike === 'Y' || recommended === 'Y';

  return (
    <div>
      <UnstyledButton
        css={{
          display: 'flex',
          flexDirection: 'row',
          gap: gap || 6,
          padding: padding || '10px',
          borderRadius: 5,
          border:
            buttonSize === 'large'
              ? recommended === 'Y'
                ? '2px solid #FF5656'
                : '2px solid #D9D9D9'
              : 'none',
          color: active ? '#FF5656' : '#999',
        }}
        {...props}
      >
        <IconLikes
          iconCss={{
            width: buttonSize === 'large' ? 14 : 16,
            height: buttonSize === 'large' ? 14 : 16,
          }}
          active={active}
        />
        <div
          css={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            color: active ? '#FF5656' : '#999',
            ...SIZE_VARIANTS[buttonSize],
          }}
        >
          {text} &nbsp;
          <>{alreadyLike ? likesCount : recommendedCount}</>
        </div>
      </UnstyledButton>
    </div>
  );
}

const SIZE_VARIANTS = {
  large: {
    fontSize: '14px',
    fontWeight: '600',
  },
  medium: {
    fontSize: '16px',
    fontWeight: '400',
  },
};
