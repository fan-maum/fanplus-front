type PostCommentOrdersProps = {
  direction: OrderDirection;
  setDirection: React.Dispatch<React.SetStateAction<OrderDirection>>;
};

const PostCommentOrders = ({ direction, setDirection }: PostCommentOrdersProps) => {
  const handleAscClick = () => setDirection(OrderDirection.ASC);
  const handleDescClick = () => setDirection(OrderDirection.DESC);
  return (
    <>
      <ul>
        <li>
          <button
            data-order={direction === OrderDirection.ASC}
            type="button"
            onClick={handleAscClick}
          >
            등록순
          </button>
        </li>
        <li>
          <button
            data-order={direction === OrderDirection.DESC}
            type="button"
            onClick={handleDescClick}
          >
            최신순
          </button>
        </li>
      </ul>
    </>
  );
};

export default PostCommentOrders;
