import { Group, UnstyledButton } from '@/components/atoms';
import IconSearch from '@/components/atoms/IconSeaarch';
import { useUrlLanguage } from '@/hooks/useLanguage';
import { communityLayoutTexts } from '@/texts/communityLayoutTexts';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormValue = {
  searchValue: string;
};

type SearchInputWrapProps = {
  withSearchInput?: boolean;
  isEditMode: boolean;
  isMyPost: boolean;
};

const CommunityBoardSearchInputWrapper = ({
  withSearchInput,
  isEditMode,
  isMyPost,
}: SearchInputWrapProps) => {
  const router = useRouter();
  const urlLang = useUrlLanguage();
  const texts = communityLayoutTexts[urlLang];
  const smallPlaceholder = urlLang === 'es' || urlLang === 'in';
  const isExposed = isEditMode || isMyPost;

  const { category_type = 0, searchValue, page = 0 } = router?.query;
  const { handleSubmit, register } = useForm<FormValue>({
    defaultValues: {
      searchValue: searchValue as string,
    },
  });

  const handleSearchSubmit: SubmitHandler<FormValue> = async (data) => {
    router.push(
      {
        pathname: `/${urlLang}/community/search/`,
        query: {
          category_type: 0,
          searchValue: data.searchValue,
          locale: router.query.locale,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleSearchSubmit)}
      css={{
        width: '40%',
        minWidth: 320,
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 18,
        border: '2px solid #FF5656',
        display: withSearchInput ? 'flex' : 'none',
        '@media (max-width: 768px)': {
          width: 'calc(100% - 32px)',
          minWidth: 0,
          margin: '0 auto',
          marginTop: 10,
          display: !isExposed ? 'flex' : 'none',
        },
      }}
    >
      <Group h={'100%'} spacing={10} css={{ position: 'relative', flex: 1 }}>
        <SearchInput
          css={{
            '&::placeholder': {
              fontSize: smallPlaceholder ? 12 : 14,
            },
          }}
          placeholder={texts.searchPlaceholder}
          {...register('searchValue')}
          defaultValue={searchValue}
        />
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
