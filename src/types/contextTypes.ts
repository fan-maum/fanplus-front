import { SetStateAction, Dispatch } from 'react';

export type LangType = 'English' | '한국어' | '中文 (简体)' | '中文 (繁體)';
export type LangContextType = {
  currLang: LangType;
  setCurrLang: Dispatch<SetStateAction<LangType>>;
};

export type SideBarContextType = {
  isSideBar: boolean;
  setIsSideBar: Dispatch<SetStateAction<boolean>>;
};
