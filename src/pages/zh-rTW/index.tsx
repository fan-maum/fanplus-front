import MainPage from '@/components/mainPage/MainPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_zh_rTW, FooterText_zh_rTW, MainPageText_zh_rTW } from '@/texts/zh-rTW';

const TaiwanHome = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rTW} footerTexts={FooterText_zh_rTW}>
      <MainPage texts={MainPageText_zh_rTW} />
    </Layout>
  );
};

export default TaiwanHome;
