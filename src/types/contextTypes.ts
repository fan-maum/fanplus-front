import { SetStateAction, Dispatch } from 'react';

export type SideBarContextType = {
  isSideBar: boolean;
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
};
