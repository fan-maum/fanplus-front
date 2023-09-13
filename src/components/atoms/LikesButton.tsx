import { UnstyledButton, UnstyledButtonProps } from '@/components/atoms';
import IconLikes from './IconLikes';

export interface LikesButtonProps extends UnstyledButtonProps {
  buttonSize?: 'medium' | 'large';
  gap?: number;
  padding?: string | number;
  text?: string;
  count?: number;
  alreadyLike?: string;
  likes?: boolean;
  recommendYN?: string;
  onClick?: () => void;
}

export default function LikesButton({
  buttonSize = 'large',
  text,
  count,
  gap,
  padding,
  alreadyLike,
  recommendYN,
  likes,
  ...props
}: LikesButtonProps) {
  const active = alreadyLike === 'Y' || recommendYN === 'Y' || likes === true;
  const recommend = recommendYN && likes === true;
  return (
    <div>
      <UnstyledButton
        css={{
          display: 'flex',
          flexDirection: 'row',
          gap: gap || 6,
          padding: padding || '16px 30px',
          borderRadius: 5,
          border:
            buttonSize === 'large'
              ? recommend
                ? '2px solid #FF5656'
                : '2px solid #D9D9D9'
              : 'none',
          color: active ? '#FF5656' : '#999',
        }}
        {...props}
      >
        <IconLikes
          iconCss={{
            width: buttonSize === 'large' ? 20 : 16,
            height: buttonSize === 'large' ? 20 : 16,
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
          <>{likes ? Number(count) + 1 : count}</>
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
