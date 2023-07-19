import { useState } from 'react';

export interface MobileVotePaginationProps {
  pageCount: number;
  onPageChange: (page: { selected: number }) => void;
}

const MobileVotePagination = ({ pageCount, onPageChange }: MobileVotePaginationProps) => {
  const [visible, setVisible] = useState(9);

  const onClickShowMore = () => {
    setVisible((prevValue: number) => prevValue + 9);
  };

  return (
    <button onClick={onClickShowMore}>더보기</button>
    // <div css={{ background: '#FFF', width: '100%', display: 'flex', justifyContent: 'center' }}>
    //   <ReactPaginate
    //     css={{
    //       width: '100%',
    //       background: '#FFF',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       gap: '20px',
    //       zIndex: 100,
    //       margin: '40px 0',
    //     }}
    //     breakLabel="..."
    //     onPageChange={onPageChange}
    //     pageCount={pageCount ? pageCount : 0}
    //     previousLabel={
    //       <Image width={10} height={10} src="/icons/icon_paginationArrow.png" alt="arrow" />
    //     }
    //     nextLabel={
    //       <Image
    //         width={10}
    //         height={10}
    //         src="/icons/icon_paginationArrow.png"
    //         alt="arrow"
    //         css={{ transform: 'scaleX(-1)' }}
    //       />
    //     }
    //     pageRangeDisplayed={5}
    //     pageClassName="page-item"
    //     pageLinkClassName="page-link"
    //     previousClassName="page-item"
    //     previousLinkClassName="page-link"
    //     nextClassName="page-item"
    //     nextLinkClassName="page-link"
    //     breakClassName="page-item"
    //     breakLinkClassName="page-link"
    //     containerClassName="pagination"
    //     activeClassName="active"
    //   />
    // </div>
    /* <>
<div>
  {freshProds?.slice(0, visible).map((freshprod) => (
    <Product
      key={freshprod.id}
      src={freshprod.src}
      name={freshprod.name}
      category={freshprod.category}
    />
  ))}
</div>
<div>
  
</div>
</> */
  );
};

export default MobileVotePagination;
