import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import css from 'styled-jsx/css';
import { usePagination, DOTS } from '../hooks/usePagination';

export interface VotePaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (onPageChange: number) => void;
}

const VotePagination = ({ ...props }: VotePaginationProps) => {
  const { currentPage, totalCount, siblingCount = 1, pageSize, onPageChange } = props;
  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || [];
  console.log(paginationRange);
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination-container">
      <li
        className="pagination-item"
        // disabled: currentPage === 1
        onClick={onPrevious}
      >
        <div className="arrow left">&lt;</div>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="pagination-item dots">
              &#8230;
            </li>
          );
        }
        return (
          <li
            className="pagination-item"
            key={pageNumber}
            // selected: pageNumber === currentPage
            onClick={(pageNumber) => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className="pagination-item"
        // disabled: currentPage === lastPage
        onClick={onNext}
      >
        <div className="arrow right">&gt;</div>
      </li>
    </ul>
  );
};

export default VotePagination;
