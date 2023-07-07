import MainPage from '@/components/mainPage/MainPage';
import MainPageText_ENG from '@/components/mainPage/texts/ENG';
import { useContext } from 'react';
import NavBarText_ENG from '@/components/layout/texts/ENG';
import Layout from '@/components/layout/Layout';

const EnglishHome = () => {
  const mainPageTexts = MainPageText_ENG;
  const navBarTexts = NavBarText_ENG;
  return (
    <Layout navBarTexts={navBarTexts}>
      <MainPage texts={mainPageTexts} />
    </Layout>
  );
};

export default EnglishHome;
