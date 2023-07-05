import { SetStateAction, Dispatch } from 'react';

export type LangType = 'ENG' | 'KOR' | 'CHN' | 'CHN-TW';
export type LangContextType = {
  currLang: LangType;
  setCurrLang: Dispatch<SetStateAction<LangType>>;
};

export type SideBarContextType = {
  isSideBar: boolean;
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
};
