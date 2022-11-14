import { Route, Routes, BrowserRouter } from 'react-router-dom';

import SingUp from './pages/Autorization/SingUp';
import SingIn from './pages/Autorization/SingIn';
import TemplatePage from './pages/TemplatePage/templatePage';
import MainPage from './pages/MainPage/mainPage';
import AboutPage from './pages/AboutPage/aboutPage';
import NotFoundPage from './pages/NotFoundPage/notFoundPage';

import { REACT_APP_BASENAME as BASENAME } from './constants';

import './App.scss';

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="sing-in" element={<SingIn />} />
          <Route path="sing-up" element={<SingUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
