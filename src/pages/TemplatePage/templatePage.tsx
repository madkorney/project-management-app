import { Outlet } from 'react-router-dom';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';

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
