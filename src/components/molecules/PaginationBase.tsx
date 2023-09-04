import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import Image from 'next/image';

const PaginationBase = ({
  pageRangeDisplayed,
  pageCount,
  forcePage,
  onPageChange,
}: ReactPaginateProps) => {
  return (
    <div css={{ background: '#FFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ReactPaginate
        css={{
          width: '100%',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          zIndex: 100,
          margin: '40px 0',
        }}
        previousLabel={
          <Image width={11} height={11} src="/icons/icon_paginationArrow.png" alt="arrow" />
        }
        nextLabel={
          <Image
            width={11}
            height={11}
            src="/icons/icon_paginationArrow.png"
            alt="arrow"
            css={{ transform: 'scaleX(-1)' }}
          />
        }
        pageRangeDisplayed={pageRangeDisplayed || 5}
        marginPagesDisplayed={0}
        forcePage={forcePage && forcePage - 1}
        pageCount={pageCount}
        onPageChange={onPageChange}
        pageClassName="page-item"
        activeClassName="active"
      />
    </div>
  );
};

export default PaginationBase;
