import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValue {
  searchValue: string | number;
}

export type CommunityBoardSearchInputProps = {
  searchTabState: [number, React.Dispatch<React.SetStateAction<any>>];
};

const CommunityBoardSearchInputWrapper = ({
  searchTabState: [activeTab, setActiveTab],
}: CommunityBoardSearchInputProps) => {
  const router = useRouter();
  const { category_type, searchValue, page = 0 } = router?.query;
  // const { category_type = 0, searchValue, page = 0 } = router?.query;
  const { handleSubmit, register, reset } = useForm<FormValue>();
  const handleSearchSubmit: SubmitHandler<FormValue> = (data) => {
    setActiveTab(0);
    router.push({
      pathname: router.pathname,
      query: {
        category_type: 0,
        searchValue: data.searchValue,
      },
    });
    reset({ searchValue: data.searchValue });
  };

  return (
    <form onSubmit={handleSubmit(handleSearchSubmit)}>
      <input
        placeholder="검색어를 입력해주세요"
        className="word-wrapper"
        {...register('searchValue')}
      />
      <button type="submit">
        <span>검색</span>
      </button>
    </form>
  );
};

export default CommunityBoardSearchInputWrapper;
