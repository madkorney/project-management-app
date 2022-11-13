import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';

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
