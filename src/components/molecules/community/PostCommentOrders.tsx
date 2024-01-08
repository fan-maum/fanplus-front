import styled from '@emotion/styled';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { OrderType } from '@/types/common';
import { useQueryClient } from 'react-query';
import { CommunityPostTextType } from '@/types/textTypes';
import { orderTypeState, pageState } from '@/store/community';
import { colors } from '@/styles/CommunityColors';

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
    <CommentOrderWrapper>
      <ul>
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
    </CommentOrderWrapper>
  );
};

export default PostCommentOrders;

const CommentOrderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  padding: 0 20px;
  border-bottom: 2px solid ${colors.gray[200]};
  ul {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
`;
const OrderListItem = styled.li<{ $order: boolean }>`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    right: -8px;
    width: 2px;
    height: 14px;
    background: #101010;
  }
  &:last-child::after {
    display: none;
  }

  > button {
    border: none;
    background: none;
    color: ${colors.gray[1000]};
    cursor: pointer;
    color: ${(props) => (props.$order ? colors.gray[1000] : colors.gray[500])};
    font-size: 14px;
    font-weight: ${(props) => (props.$order ? '500' : '400')};
  }
`;
