import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { Stack } from '../atoms/Stack';
import VoteTitle from '../molecules/VoteTitle';
import { VoteData } from '@/types/vote';
import css from 'styled-jsx/css';
import { usePagination, DOTS } from '../../hooks/usePagination';
import VotePaginationItems from '../organisms/VotePaginationItems';
import { getVotes } from '@/api/Vote';
import VoteList from './VoteList';

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

  let [users, setUsers] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  // let fetchUsers = async (page = 1) => {
  //   const datas = await getVotes("",0);
  //   let totalPages = Math.ceil(10/3);

  //   setPageCount(totalPages);
  //   setUsers(datas);
  // }

  // useEffect(() => {
  //   fetchUsers()
  // }, [])
  
  const [itemOffset, setItemOffset] = useState(0);

  return (
    <>
    <div>
      {users.map((user, index) => 
        <div key={index} css={{
          background: '#FFF',
          zIndex: 100,
        }}>
          <div>test</div>
          {/* <div>{user.name}</div>
          <div>{user.email}</div> */}
        </div>
      )}
    </div>
    <div css={{ background: '#FFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <ReactPaginate
        css={{
          width: '100%',
          background: '#FFF',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          zIndex: 100,
        }}
        breakLabel="..."
        onPageChange={(page) => {
          console.log(page.selected);
          fetchUsers(page.selected + 1);
        }}
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
    </>
  );
};

export default VotePagination;
