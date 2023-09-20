import { atom } from 'recoil';
import { OrderType, selectInfoType } from '@/types/common';
import { CommentResponseType } from '@/types/community';

export const orderTypeState = atom<OrderType>({
  key: 'orderTypeState',
  default: 'newest',
});

export const pageState = atom<number>({
  key: 'pageStatae',
  default: 0,
});

export const commentListState = atom<Array<CommentResponseType>>({
  key: 'commentListState',
  default: [],
});

export const selectInfoState = atom<selectInfoType>({
  key: 'selectInfoState',
  default: {
    purpose: null,
    target_type: null,
    idx: '',
  },
});

//   const [cookies, setCookies] = useRecoilState(cookieState);
//   const cookies = useRecoilValue(cookieState);
//   const setCookies = useSetRecoilState(cookieState);
