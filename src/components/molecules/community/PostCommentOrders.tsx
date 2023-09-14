import styled from '@emotion/styled';
import { BackLangType, OrderType, TargetType } from '@/types/common';
import { CommunityCommentListItemType, CommunityCommentResponseType } from '@/types/community';
import { getCommunityPostCommentData, getCommunityUnAuthPostCommentData } from '@/api/Community';

type PostCommentOrdersProps = {
  getCommentParams: {
    target_type: TargetType;
    target: number;
    lang: BackLangType;
    identity: string;
  };
  commentOrder: OrderType;
  setCommentOrder: React.Dispatch<React.SetStateAction<OrderType>>;
  setData: React.Dispatch<React.SetStateAction<Array<CommunityCommentListItemType>>>;
};

const PostCommentOrders = ({
  getCommentParams,
  commentOrder,
  setCommentOrder,
  setData,
}: PostCommentOrdersProps) => {
  const OrderOnClick = async (orderType: OrderType, page: number) => {
    setCommentOrder(orderType);
    let getCommentResponse: CommunityCommentResponseType;
    getCommentParams.identity !== null
      ? (getCommentResponse = await getCommunityPostCommentData(
          getCommentParams.target_type,
          String(getCommentParams.target),
          orderType,
          getCommentParams.lang,
          page,
          getCommentParams.identity,
          10
        ))
      : (getCommentResponse = await getCommunityUnAuthPostCommentData(
          getCommentParams.target_type,
          getCommentParams.target,
          orderType,
          'ko-en-ja-es-vi-id-zh-zhtw',
          getCommentParams.lang,
          page,
          10
        ));
    const comments = getCommentResponse.RESULTS.DATAS.COMMENTS;
    return comments;
  };
  const handleNewestClick = async () => {
    const comments = await OrderOnClick('newest', 0);
    // eslint-disable-next-line no-console
    console.log(comments);
    setData(comments);
  };
  const handleOldesetClick = async () => {
    const comments = await OrderOnClick('oldest', 0);
    setData(comments);
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
