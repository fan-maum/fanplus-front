import MainPage from '@/components/mainPage/MainPage';
import Layout from '@/components/organisms/Layout';
import { NavBarText_JAP, FooterText_JAP, MainPageText_JAP } from '@/texts/ja';

const JapanHome = () => {
  return (
    <Layout navBarTexts={NavBarText_JAP} footerTexts={FooterText_JAP}>
      <MainPage texts={MainPageText_JAP} />
    </Layout>
  );
};

export default JapanHome;
