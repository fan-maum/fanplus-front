import { Avatar, Stack, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TargetType } from '@/types/common';
import { useRouter } from 'next/router';
import { CommunityPostTextType } from '@/types/textTypes';
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/community';
import { getProfileData } from '@/utils/communityUtil';
import { colors } from '@/styles/CommunityColors';

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

const ReplyRegister = ({
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
        height: '120px',
        padding: '20px 20px 20px 30px',
        borderTop: '1px solid #f1f1f1',
        '@media(max-width:768px)': {
          alignItems: 'flex-start',
          height: '130px',
          padding: '10px 16px',
          gap: 12,
        },
      }}
    >
      <Avatar
        imageProps={{ style: { borderRadius: '50%' } }}
        w={46}
        h={46}
        radius={'50%'}
        css={{
          border: '1px solid #F8F8F9',
          '@media(max-width:768px)': { width: '60px', height: '60px' },
        }}
        src={profile.profileImg}
        alt="Avatar"
      />
      <Stack
        fw={600}
        fz={17}
        align="center"
        h="100%"
        spacing={10}
        css={{
          flexDirection: 'row',
          flex: 1,
          '@media(max-width:768px)': { flexDirection: 'column', alignItems: 'flex-end' },
        }}
      >
        <RegisterInputWrapper
          css={{ padding: profile.profileNick ? '20px 10px 10px 10px' : '10px' }}
        >
          <label>{profile && profile.profileNick}</label>
          <RegisterInput
            placeholder={texts.replyRegisterPlaceholder}
            {...register('registerValue', { maxLength: 200 })}
            css={{ padding: profile.profileNick ? '20px 0 0 0' : '0px' }}
          />
        </RegisterInputWrapper>
        <UnstyledButton
          type="submit"
          bg={colors.primary[400]}
          h={80}
          px={16}
          css={{
            display: 'flex',
            alignItems: 'center',
            width: 'auto',
            height: 80,
            margin: 0,
            padding: '6px 20px',
            borderRadius: '6px',
            color: '#fff',
            fontSize: 20,
            fontWeight: 600,
            '@media(max-width: 768px)': { height: 32, padding: '7px 16px' },
          }}
        >
          <span>{texts.register}</span>
        </UnstyledButton>
      </Stack>
    </form>
  );
};

export default ReplyRegister;

const RegisterInputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  flex: 1;
  outline: none;
  padding: 20px 10px 10px 10px;
  border: 1px solid #f1f1f1;
  border-radius: 10px;
  & > label {
    position: absolute;
    top: 10px;
    color: #101010;
    font-size: 16px;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

const RegisterInput = styled.input`
  width: 100%;
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 400;
  padding: 20px 0 0 0;
  &::placeholder {
    color: '#D9D9D9';
    font-size: 14px;
    font-weight: 400;
  }
`;
