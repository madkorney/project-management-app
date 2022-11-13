import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './templatePage.scss';

const TemplatePage = () => {
  return (
    <>
      <Header />
      <div className="body-container">
        <div className="main-container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TemplatePage;
