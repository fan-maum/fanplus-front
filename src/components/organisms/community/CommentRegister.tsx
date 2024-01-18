import { Avatar, Stack, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/community';
import { getProfileData } from '@/utils/communityUtil';

interface FormValue {
  registerValue: string | number;
}

type CommentRegisterProps = {
  identity: string;
  texts: CommunityPostTextType;
  POST_IDX: string;
  createMode: TargetType;
  onCreateComment: (
    identity: string,
    target_type: TargetType,
    target: number,
    contents: any
  ) => void;
};

const CommentRegister = ({
  identity,
  texts,
  POST_IDX,
  createMode,
  onCreateComment,
}: CommentRegisterProps) => {
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const router = useRouter();
  const user = useRecoilValue(userState);
  const profile = getProfileData(user);
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
        alignItems: 'center',
        gap: 10,
        width: '100%',
        margin: '0 auto',
        maxWidth: '768px',
        height: '60px',
        padding: '14px 20px 14px 20px',
      }}
    >
<<<<<<< HEAD
      <Stack fw={600} fz={17} h="100%" spacing={5} css={{ flexDirection: 'row', flex: 1 }}>
        <RegisterTextarea
=======
      <Avatar
        imageProps={{ style: { borderRadius: '50%' } }}
        w={40}
        h={40}
        radius={'50%'}
        css={{
          border: '1px solid #F8F8F9',
        }}
        src={profile.profileImg}
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
>>>>>>> master
          placeholder={texts.commentRegisterPlaceholder}
          {...register('registerValue', { maxLength: 200 })}
        />
        <UnstyledButton
          type="submit"
          bg="#FF5656"
          h={32}
          px={16}
          css={{
            width: 'auto',
            height: 38,
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

const RegisterTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 500;
<<<<<<< HEAD
  border: 1px solid ${colors.gray[200]};
  border-radius: 6px;
  padding: 10px;
  overflow: auto;
  text-overflow: ellipsis;
=======
>>>>>>> master
  &::placeholder {
    color: '#ABAFB7';
  }
`;
