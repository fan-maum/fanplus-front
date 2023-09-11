import { Avatar, Button, Group, Stack } from '@/components/atoms';

type CommentRegisterProps = {
  WRITER_PROFILE_IMG: string;
};

const CommentRegister = ({ WRITER_PROFILE_IMG }: CommentRegisterProps) => {
  const RegisterOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  return (
    <Group
      spacing={10}
      dir="row"
      align={'center'}
      css={{
        width: '100%',
        margin: '0 auto',
        maxWidth: '768px',
        height: '90px',
        padding: '14px 20px 14px 20px',
      }}
    >
      <Avatar
        imageProps={{ style: { borderRadius: '50%' } }}
        w={60}
        h={60}
        radius={'50%'}
        css={{
          border: '1px solid #F8F8F9',
        }}
        src={WRITER_PROFILE_IMG}
        alt="Avatar"
      />
      <Stack
        fw={600}
        fz={17}
        align="center"
        h="100%"
        spacing={5}
        css={{ flexDirection: 'row', flex: 1 }}
      >
        <input
          type="text"
          placeholder="댓글을 남겨주세요. (200자)"
          css={{
            width: '100%',
            height: '100%',
            flex: 1,
            border: 'none',
            outline: 'none',
            color: '#ABAFB7',
            fontSize: 20,
            fontWeight: 500,
            '&::placeholder': {
              color: '#ABAFB7',
            },
          }}
        />
        <Button
          onClick={RegisterOnClick}
          css={{ width: 'auto', height: 38, margin: 0, padding: '6px 14px' }}
        >
          등록
        </Button>
      </Stack>
    </Group>
  );
};

export default CommentRegister;
