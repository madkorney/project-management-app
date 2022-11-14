import { Outlet } from 'react-router-dom';
import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';

import './templatePage.scss';

const TemplatePage = () => {
  return (
    <div className="body-container">
      <Header />
      <div className="main-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default TemplatePage;
