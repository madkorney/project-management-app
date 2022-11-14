import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import TemplatePage from './components/TemplatePage/templatePage';
import Main from './components/Main/main';
import About from './components/About/about';
import PageNotFound from './components/PageNotFound/pageNotFound';

import { REACT_APP_BASENAME as BASENAME } from './constants';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
