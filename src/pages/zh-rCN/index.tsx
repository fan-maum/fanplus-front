import MainPage from '@/components/mainPage/MainPage';
import Layout from '@/components/layout/Layout';
import { NavBarText_zh_rCN, FooterText_zh_rCN, MainPageText_zh_rCN } from '@/texts/zh-rCN';

const ChinaHome = () => {
  return (
    <Layout navBarTexts={NavBarText_zh_rCN} footerTexts={FooterText_zh_rCN}>
      <MainPage texts={MainPageText_zh_rCN} />
    </Layout>
  );
};

export default ChinaHome;