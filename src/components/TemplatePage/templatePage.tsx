import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
