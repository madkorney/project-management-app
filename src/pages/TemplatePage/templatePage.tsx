import { Suspense, useState, UIEvent } from 'react';
import { Outlet } from 'react-router-dom';

import { Header, Footer, Loader } from 'components';

import './templatePage.scss';

enum ColorHeader {
  initColor = '#1b3c6c',
  createColor = '#1b3c6ca1',
}

const TemplatePage = () => {
  const [colorHeader, setColorHeader] = useState(ColorHeader.initColor);

  const handleScroll = (ev: UIEvent<HTMLElement>) => {
    if (ev.currentTarget.scrollTop > 20 && colorHeader === ColorHeader.initColor) {
      setColorHeader(ColorHeader.createColor);
    } else if (ev.currentTarget.scrollTop < 40 && colorHeader === ColorHeader.createColor) {
      setColorHeader(ColorHeader.initColor);
    }
  };

  return (
    <>
      <Header bg={colorHeader} />
      <main className="main main-container" onScroll={handleScroll}>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default TemplatePage;
