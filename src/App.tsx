import { Route, Routes, BrowserRouter } from 'react-router-dom';

import SignUp from './pages/Autorization/SignUp';
import SignIn from './pages/Autorization/SignIn';
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
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
