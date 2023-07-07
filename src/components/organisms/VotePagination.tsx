import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import css from 'styled-jsx/css';
import { usePagination, DOTS } from '../../hooks/usePagination';
import VotePaginationItems from '../organisms/VotePaginationItems';

export interface VotePaginationProps {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  siblingCount?: number;
  voteList: VoteData[];
  currentData: VoteData[];
  onPageChange: (onPageChange: number) => void;
}

const VotePagination = ({ ...props }: VotePaginationProps) => {
  const {
    currentPage,
    totalCount,
    siblingCount = 1,
    itemsPerPage,
    voteList,
    currentData,
    onPageChange,
  } = props;
  //   const paginationRange =
  //     usePagination({
  //       currentPage,
  //       totalCount,
  //       siblingCount,
  //       itemsPerPage,
  //     }) || [];
  //   console.log(paginationRange);

  console.log(voteList);

  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = voteList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(voteList.length / itemsPerPage);
  console.log('pageCount', pageCount);
  console.log('currentItems', currentItems);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % voteList.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  //   if (currentPage === 0 || paginationRange.length < 2) {
  //     return null;
  //   }
  //   const onNext = () => {
  //     onPageChange(currentPage + 1);
  //   };
  //   const onPrevious = () => {
  //     onPageChange(currentPage - 1);
  //   };
  //   let lastPage = paginationRange[paginationRange.length - 1];
  return (
    // <ul className="pagination-container">
    //   <li
    //     className="pagination-item"
    //     // disabled: currentPage === 1
    //     onClick={onPrevious}
    //   >
    //     <div className="arrow left">&lt;</div>
    //   </li>
    //   {paginationRange.map((pageNumber) => {
    //     if (pageNumber === DOTS) {
    //       return (
    //         <li key={pageNumber} className="pagination-item dots">
    //           &#8230;
    //         </li>
    //       );
    //     }
    //     return (
    //       <li
    //         className="pagination-item"
    //         key={pageNumber}
    //         // selected: pageNumber === currentPage
    //         onClick={(pageNumber) => onPageChange(pageNumber)}
    //       >
    //         {pageNumber}
    //       </li>
    //     );
    //   })}
    //   <li
    //     className="pagination-item"
    //     // disabled: currentPage === lastPage
    //     onClick={onNext}
    //   >
    //     <div className="arrow right">&gt;</div>
    //   </li>
    // </ul>

    <div css={{ background: '#FFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
      {/* <VotePaginationItems currentItems={currentItems} /> */}
      <ReactPaginate
        css={{
          width: '100%',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
        breakLabel="..."
        onPageChange={handlePageClick}
        // pageRangeDisplayed={3}
        pageCount={pageCount}
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
        renderOnZeroPageCount={null}
        // marginPagesDisplayed={2}
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
