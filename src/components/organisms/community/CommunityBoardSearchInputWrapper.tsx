import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Group, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import Image from 'next/image';
import { CommunityPageTextType } from '@/types/textTypes';

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
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const handleSearchSubmit: SubmitHandler<FormValue> = (data) => {
    setActiveTab(texts.allCategory);
    router.push({
      pathname: router.pathname,
      query: {
        category_type: 0,
        searchValue: data.searchValue,
        tab: 'search',
      },
    });
    reset({ searchValue: data.searchValue });
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
      <Group h={'100%'} spacing={10} css={{ flex: 1, borderBottom: '2px solid #f1f1f1' }}>
        <Image src={'/icons/icon_search.svg'} width={32} height={32} alt="searchIcon" />
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
  flex: 1;
  outline: none;
  border: none;
  color: #101010;
  font-size: 16px;
  font-weight: 500;
  &::placeholder {
    color: '#101010';
  }
`;
