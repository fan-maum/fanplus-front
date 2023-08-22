import {
  Avatar,
  AvatarProps,
  Stack,
  UnstyledButton,
  UnstyledButtonProps,
} from '@/components/atoms';

export interface ShareButtonWithIconProps extends UnstyledButtonProps {
  buttonId?: string;
  src: string;
  text: string;
  varient?: 'twitter';
  avatarProps?: AvatarProps;
  c?: string;
  onClick?: () => void;
}

function ShareButtonWithIcon({
  buttonId,
  src,
  text,
  avatarProps,
  varient,
  c,
  ...props
}: ShareButtonWithIconProps) {
  return (
    <UnstyledButton buttonId={buttonId} {...props}>
      <Stack spacing={6} w={72} align="center">
        <Avatar
          src={src}
          size={72}
          css={{
            display: 'flex',
            backgroundColor: c,
          }}
          imageProps={{
            style: {
              width: varient ? 72 : 40,
              height: varient ? 72 : 40,
              margin: 'auto',
            },
          }}
          {...avatarProps}
        />
        <div
          css={{
            textAlign: 'center',
            whiteSpace: 'nowrap',
            fontSize: 13,
            fontWeight: 400,
            color: '#475357',
          }}
        >
          {text}
        </div>
      </Stack>
    </UnstyledButton>
  );
}

export default ShareButtonWithIcon;
