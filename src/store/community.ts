import { atom, RecoilEnv } from 'recoil';
import type { BoardLangType, OrderType, TargetType, selectInfoType } from '@/types/common';
import type { UserResponseType } from '@/types/community';
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const orderTypeState = atom<OrderType>({
  key: 'orderTypeState',
  default: 'newest',
});

export const pageState = atom<number>({
  key: 'pageStatae',
  default: 0,
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

export const userState = atom<UserResponseType | null>({
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
