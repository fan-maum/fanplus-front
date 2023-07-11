import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { VoteData } from '@/types/vote';

export interface VotePaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  voteList: VoteData[];
  onPageChange: (page: { selected: number }) => void;
}

const VotePagination = ({ ...props }: VotePaginationProps) => {
  const { totalCount, itemsPerPage, onPageChange } = props;
  let pageCount = Math.ceil(totalCount / itemsPerPage);

  return (
    <div css={{ background: '#FFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ReactPaginate
        css={{
          width: '100%',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 100,
          margin: '40px 0',
        }}
        breakLabel="..."
        onPageChange={onPageChange}
        pageCount={pageCount ? pageCount : 0}
        previousLabel={
          <Image width={10} height={10} src="/icons/icon_paginationArrow.png" alt="arrow" />
        }
        nextLabel={
          <Image
            width={10}
            height={10}
            src="/icons/icon_paginationArrow.png"
            alt="arrow"
            css={{ transform: 'scaleX(-1)' }}
          />
        }
        pageRangeDisplayed={5}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default VotePagination;
