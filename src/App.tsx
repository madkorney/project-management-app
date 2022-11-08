import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import TemplatePage from './components/TemplatePage/templatePage';
import Main from './components/Main/main';
import About from './components/About/about';
import PageNotFound from './components/PageNotFound/pageNotFound';

import './App.scss';

const BASENAME = '/project-management-app'; // todo - move to .env

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
