import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { OrderType } from '@/types/common';
import { useQueryClient } from 'react-query';
import { CommunityPostTextType } from '@/types/textTypes';
import { orderTypeState, pageState } from '@/store/community';

type PostCommentOrdersProps = {
  texts: CommunityPostTextType;
  refetch: () => void;
};

const PostCommentOrders = ({ texts, refetch }: PostCommentOrdersProps) => {
  const setPage = useSetRecoilState(pageState);
  const [orderType, setOrderType] = useRecoilState(orderTypeState);
  const queryClient = useQueryClient();
  const OrderOnClick = async (orderType: OrderType) => {
    await queryClient.removeQueries('comments');
    await setPage(0);
    await setOrderType(orderType);
    await refetch();
  };

  return (
    <ul css={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <OrderListItem $order={orderType === 'newest'}>
        <button type="button" onClick={() => OrderOnClick('newest')}>
          {texts.orderNewest}
        </button>
      </OrderListItem>
      <OrderListItem $order={orderType === 'oldest'}>
        <button type="button" onClick={() => OrderOnClick('oldest')}>
          {texts.orderOldest}
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
