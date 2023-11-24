import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Group, UnstyledButton } from '@/components/atoms';
import styled from '@emotion/styled';
import { CommunityPageTextType } from '@/types/textTypes';
import { useQueryClient } from 'react-query';
import IconSearch from '@/components/atoms/IconSeaarch';

export interface FormValue {
  searchValue: string | number;
}

export type CommunityBoardSearchInputProps = {
  searchTabState: [string, React.Dispatch<React.SetStateAction<any>>];
  setTabBar: React.Dispatch<React.SetStateAction<any>>;
  texts: CommunityPageTextType;
};

const CommunityBoardSearchInputWrapper = ({
  searchTabState: [activeTab, setActiveTab],
  setTabBar,
  texts,
}: CommunityBoardSearchInputProps) => {
  const router = useRouter();
  const { category_type = 0, searchValue, page = 0 } = router?.query;
  const queryClient = useQueryClient();
  const { handleSubmit, register, reset } = useForm<FormValue>();

  const handleSearchSubmit: SubmitHandler<FormValue> = async (data) => {
    await queryClient.removeQueries('boardResults');
    await setTabBar('boards');
    await setActiveTab(texts.allCategory);
    await router.push(
      {
        pathname: router.pathname,
        query: {
          category_type: 0,
          searchValue: data.searchValue,
          tab: 'boards',
          locale: router.query.locale,
        },
      },
      undefined,
      { shallow: true }
    );
    reset({ searchValue: data.searchValue });
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearchSubmit)}
      css={{
        width: '50%',
        height: 40,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
        border: '2px solid #FF5656',
      }}
    >
      <Group h={'100%'} spacing={10} css={{ position: 'relative', flex: 1 }}>
        <SearchInput placeholder={texts.searchPlaceholder} {...register('searchValue')} />
      </Group>
      <UnstyledButton type="submit" bg="#FF5656" h={40} p={'4px 10px'}>
        <IconSearch fill="#fff" />
      </UnstyledButton>
    </form>
  );
};

export default CommunityBoardSearchInputWrapper;

const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  padding-left: 10px;
  color: #101010;
  font-size: 14px;
  font-weight: 500;
  &::placeholder {
    color: '#75717A';
  }
`;
