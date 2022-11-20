import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from 'routes';
import { lazy } from 'react';

import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import TemplatePage from './pages/TemplatePage/templatePage';
import MainPage from './pages/MainPage/mainPage';
import AboutPage from './pages/AboutPage/aboutPage';
import NotFoundPage from './pages/NotFoundPage/notFoundPage';

import { REACT_APP_BASENAME as BASENAME } from './data/constants';

const BoardsPage = lazy(() => import('pages/BoardsPage/boardsPage'));
const UserPage = lazy(() => import('pages/UserPage'));

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="boards" element={<BoardsPage />} />
            <Route path="user-page" element={<UserPage />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
