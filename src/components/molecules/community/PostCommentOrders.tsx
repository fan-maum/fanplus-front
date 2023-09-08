import styled from '@emotion/styled';
import { OrderType } from '@/types/common';
import { useRouter } from 'next/router';

type PostCommentOrdersProps = {
  commentOrder: OrderType;
  setCommentOrder: React.Dispatch<React.SetStateAction<OrderType>>;
};

const PostCommentOrders = ({ commentOrder, setCommentOrder }: PostCommentOrdersProps) => {
  const router = useRouter();
  const handleNewestClick = () => {
    setCommentOrder('newest');
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, order_by: 'newest' },
      },
      undefined,
      { scroll: false }
    );
  };
  const handleOldesetClick = () => {
    setCommentOrder('oldest');
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, order_by: 'oldest' },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <ul css={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <OrderListItem $order={commentOrder === 'newest'}>
        <button type="button" onClick={handleNewestClick}>
          최신순
        </button>
      </OrderListItem>
      <OrderListItem $order={commentOrder === 'oldest'}>
        <button type="button" onClick={handleOldesetClick}>
          등록순
        </button>
      </OrderListItem>
    </ul>
  );
};

export default PostCommentOrders;

const OrderListItem = styled.li<{ $order: boolean }>`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: -8px;
    width: 2px;
    height: 90%;
    background: #101010;
  }
  &:last-child::after {
    display: none;
  }

  > button {
    border: none;
    background: none;
    color: '#101010';
    cursor: pointer;
    color: ${(props) => (props.$order ? '#101010' : '#D9D9D9')};
    font-size: 18px;
    font-weight: ${(props) => (props.$order ? '600' : '400')};
  }
`;
