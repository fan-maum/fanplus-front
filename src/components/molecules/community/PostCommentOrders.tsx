import styled from '@emotion/styled';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommentListItemType, CommentResponseType } from '@/types/community';
import { getComments } from '@/api/Community';

type PostCommentOrdersProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  orderType: OrderType;
  setOrderType: React.Dispatch<React.SetStateAction<OrderType>>;
  setCommentList: React.Dispatch<React.SetStateAction<Array<CommentListItemType>>>;
};

const PostCommentOrders = ({
  getCommentParams,
  orderType,
  setOrderType,
  setCommentList,
}: PostCommentOrdersProps) => {
  const OrderOnClick = async (orderType: OrderType, page: number) => {
    setOrderType(orderType);
    const border_lang = 'ALL';
    const getCommentResponse: CommentResponseType = await getComments(
      getCommentParams.target,
      getCommentParams.identity,
      border_lang,
      orderType,
      page,
      20
    );

    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    return comments;
  };
  const handleNewestClick = async () => {
    const comments = await OrderOnClick('newest', 0);
    setCommentList(comments);
  };
  const handleOldesetClick = async () => {
    const comments = await OrderOnClick('oldest', 0);
    setCommentList(comments);
  };

  return (
    <ul css={{ display: 'flex', alignItems: 'center', gap: 18 }}>
      <OrderListItem $order={orderType === 'newest'}>
        <button type="button" onClick={handleNewestClick}>
          최신순
        </button>
      </OrderListItem>
      <OrderListItem $order={orderType === 'oldest'}>
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
