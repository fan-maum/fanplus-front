import { atom, atomFamily, RecoilEnv } from 'recoil';
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

export const blockUserModalBlockState = atom<boolean>({
  key: 'blockUserModalBlockState',
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

export const openSideBarState = atom<boolean>({
  key: 'openSideBarState',
  default: false,
});

export const openLanguageFitlerState = atom<boolean>({
  key: 'openLanguageFitlerState',
  default: false,
});

export const boardLangState = atomFamily<BoardLangType, any>({
  key: 'boardLangState',
  default: (boardLangCookie) => boardLangCookie,
});

export const isMobileState = atom<boolean>({
  key: 'isMobileState',
  default: false,
});

export const permissionModalState = atom<boolean>({
  key: 'permissionModalState',
  default: false,
});
