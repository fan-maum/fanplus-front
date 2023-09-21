import { atom, atomFamily } from 'recoil';
import { BoardLangType, OrderType, TargetType, selectInfoType } from '@/types/common';
import { CommentResponseType, userResponseType } from '@/types/community';

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

export const checkCommentState = atom<boolean>({
  key: 'checkCommentState',
  default: false,
});

export const modalBlockState = atom<boolean>({
  key: 'modalBlockState',
  default: false,
});

export const reportModalBlockState = atom<boolean>({
  key: 'reportModalBlockState',
  default: false,
});

export const userState = atom<userResponseType | null>({
  key: 'userState',
  default: null,
});

export type postParamStateType = {
  target_type: TargetType;
  target: number;
  lang: BoardLangType;
  identity: string;
};

export const postParamState = atom<postParamStateType>({
  key: 'postParamState',
  default: {
    target_type: 'post',
    target: 0,
    lang: 'ko',
    identity: '0',
  },
});

//   const [cookies, setCookies] = useRecoilState(cookieState);
//   const cookies = useRecoilValue(cookieState);
//   const setCookies = useSetRecoilState(cookieState);
