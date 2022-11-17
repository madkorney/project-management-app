import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from 'routes/privateRoute';

import SignUp from 'pages/AuthorizationPage/SignUp';
import SignIn from 'pages/AuthorizationPage/SignIn';
import TemplatePage from 'pages/TemplatePage/templatePage';
import MainPage from 'pages/MainPage/mainPage';
import AboutPage from 'pages/AboutPage/aboutPage';
import NotFoundPage from 'pages/NotFoundPage/notFoundPage';
import BoardsPage from 'pages/BoardsPage/boardsPage';

import { REACT_APP_BASENAME as BASENAME } from './constants';

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<MainPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="boards" element={<BoardsPage />} />
          </Route>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
