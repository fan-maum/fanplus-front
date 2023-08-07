import { SetStateAction, Dispatch } from 'react';

export type SideBarContextType = {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
};

export type NextUrlContextType = {
  nextUrl: string;
  setNextUrl: Dispatch<SetStateAction<string>>;
};
