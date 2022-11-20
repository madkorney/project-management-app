import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer, Loader } from 'components';

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
      <Footer />
    </>
  );
};

export default TemplatePage;
