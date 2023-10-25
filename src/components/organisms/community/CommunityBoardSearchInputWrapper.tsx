import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Group, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { CommunityPageTextType } from '@/types/textTypes';
import { useQueryClient } from 'react-query';

interface FormValue {
  searchValue: string | number;
}

export type CommunityBoardSearchInputProps = {
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
  texts: CommunityPageTextType;
};

const CommunityBoardSearchInputWrapper = ({
  searchTabState: [activeTab, setActiveTab],
  texts,
}: CommunityBoardSearchInputProps) => {
  const router = useRouter();
  const { category_type = 0, searchValue, page = 0 } = router?.query;
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const handleSearchSubmit: SubmitHandler<FormValue> = async (data) => {
    await queryClient.removeQueries('boardResults');
    await setActiveTab(texts.allCategory);
    await router.push(
      {
        pathname: router.pathname,
        query: {
          category_type: 0,
          searchValue: data.searchValue,
          tab: 'search',
          locale: router.query.locale,
        },
      },
      undefined,
      { shallow: true }
    );
    await reset({ searchValue: data.searchValue });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearchSubmit)}
      css={{
        height: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
        padding: '10px 20px',
        borderBottom: '4px solid #f1f1f1',
      }}
    >
      <Group
        h={'100%'}
        spacing={10}
        css={{ position: 'relative', flex: 1, borderBottom: '2px solid #f1f1f1' }}
      >
        <img
          src="/icons/icon_search.svg"
          alt="searchIcon"
          css={{ width: 32, height: 32, position: 'absolute', left: 0 }}
        />
        <SearchInput placeholder={texts.searchPlaceholder} {...register('searchValue')} />
      </Group>
      <UnstyledButton
        type="submit"
        bg="#FF5656"
        h={36}
        px={16}
        css={{
          borderRadius: '6px',
          color: '#fff',
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <span>{texts.buttonSearch}</span>
      </UnstyledButton>
    </form>
  );
};

export default CommunityBoardSearchInputWrapper;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 32px;
  color: #101010;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: '#101010';
  }
`;
