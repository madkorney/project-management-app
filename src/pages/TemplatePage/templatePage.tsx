import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Loader from 'components/Loader';
import Header from 'components/Header/header';
import Footer from 'components/Footer/footer';

import './templatePage.scss';

const TemplatePage = () => {
  return (
    <>
      <Header />
      <main className="main main-container">
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />;
    </>
  );
};

export default TemplatePage;
