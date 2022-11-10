import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import TemplatePage from './components/TemplatePage/templatePage';
import Main from './components/Main/main';
import About from './components/About/about';
import PageNotFound from './components/PageNotFound/pageNotFound';

import './App.scss';
import SingOut from './components/Autorization';
import SingIn from './components/Autorization/SingIn/SingIn';

const BASENAME = '/project-management-app'; // todo - move to .env

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="sing-in" element={<SingIn />} />
          <Route path="sing-out" element={<SingOut />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
