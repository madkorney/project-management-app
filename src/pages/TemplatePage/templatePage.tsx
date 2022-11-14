import { Outlet } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';

import './templatePage.scss';

const TemplatePage = () => {
  return (
    <>
      <Header />
      <div className="body-container">
        <main className="main container">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default TemplatePage;
