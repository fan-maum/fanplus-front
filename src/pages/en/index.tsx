import MainPage from '@/components/mainPage/MainPage';
import MainPageText_ENG from '@/components/mainPage/texts/ENG';
import { useContext } from 'react';
import { LangContext } from '../_app';
import { LangContextType } from '@/types/contextTypes';

const EnglishHome = () => {
  const { setCurrLang } = useContext(LangContext) as LangContextType;
  setCurrLang('English');
  const texts = MainPageText_ENG;
  return <MainPage texts={texts} />;
};

export default EnglishHome;
