import { postCommentResult } from '@/api/Community';
import { Avatar, Stack, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import nookies from 'nookies';

interface FormValue {
  registerValue: string | number;
}

type CommentRegisterProps = {
  identity: string;
  BOARD_IDX: string;
  WRITER_PROFILE_IMG: string;
};

const CommentRegister = ({ identity, BOARD_IDX, WRITER_PROFILE_IMG }: CommentRegisterProps) => {
  const RegisterOnClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const handleRegisterSubmit: SubmitHandler<FormValue> = async (data) => {
    const contents = data.registerValue;
    const result = await postCommentResult(identity, 'comment', BOARD_IDX, contents);
    console.log(result);
    // setActiveTab(texts.allCategory);
    // router.push({
    //   pathname: router.pathname,
    //   query: {
    //     category_type: 0,
    //     searchValue: data.searchValue,
    //   },
    // });
    reset({ registerValue: data.registerValue });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegisterSubmit)}
      css={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
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
        <RegisterInput
          placeholder="댓글을 남겨주세요. (200자)"
          {...register('registerValue', { maxLength: 200 })}
        />
        <UnstyledButton
          type="submit"
          bg="#FF5656"
          h={36}
          px={16}
          css={{
            width: 'auto',
            height: 38,
            margin: 0,
            padding: '6px 14px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <span>등록</span>
        </UnstyledButton>
      </Stack>
    </form>
  );
};

export default CommentRegister;

const RegisterInput = styled.input`
  width: 100%;
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  font-weight: 500;
  &::placeholder {
    color: '#ABAFB7';
  }
`;
