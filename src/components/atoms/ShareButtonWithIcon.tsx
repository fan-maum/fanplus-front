import {
  Avatar,
  AvatarProps,
  Stack,
  UnstyledButton,
  UnstyledButtonProps,
} from '@/components/atoms';

export interface ShareButtonWithIconProps extends UnstyledButtonProps {
  src: string;
  text: string;
  avatarProps?: AvatarProps;
  c?: string;
  onClick?: () => void;
}

function ShareButtonWithIcon({ src, text, avatarProps, c, ...props }: ShareButtonWithIconProps) {
  return (
    <UnstyledButton {...props}>
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
              width: 40,
              height: 40,
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
