import { Stack, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { colors } from '@/styles/CommunityColors';

interface FormValue {
  registerValue: string | number;
}

type CommentRegisterProps = {
  identity: string;
  POST_IDX: string;
  createMode: TargetType;
  texts: CommunityPostTextType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
};

const CommentRegister = ({
  identity,
  POST_IDX,
  createMode,
  texts,
  onCreateComment,
}: CommentRegisterProps) => {
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const router = useRouter();
  const handleRegisterSubmit: SubmitHandler<FormValue> = async (data) => {
    const contents = data.registerValue;
    if (identity !== null) {
      onCreateComment(identity, createMode, Number(POST_IDX), contents);
    } else {
      const path = router.asPath;
      router.push({ pathname: '/login', query: { nextUrl: path } });
    }
    reset({ registerValue: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegisterSubmit)}
      css={{
        display: 'flex',
        gap: 12,
        width: '100%',
        height: '70px',
        marginTop: 20,
      }}
    >
      <Stack fw={600} fz={17} h="100%" spacing={5} css={{ flexDirection: 'row', flex: 1 }}>
        <RegisterInput
          placeholder={texts.commentRegisterPlaceholder}
          {...register('registerValue', { maxLength: 200 })}
        />
        <UnstyledButton
          type="submit"
          bg={colors.primary[500]}
          h={'100%'}
          px={16}
          css={{
            width: '60px',
            margin: 0,
            padding: '4px 14px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          <span>{texts.register}</span>
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
  outline: none;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  padding: 10px;
  &::placeholder {
    color: ${colors.gray[500]};
  }
`;
