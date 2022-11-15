import { Outlet } from 'react-router-dom';

import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';

import './templatePage.scss';

const TemplatePage = () => {
  return (
    <>
      <Header />
      <main className="main main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default TemplatePage;
