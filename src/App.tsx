import { lazy } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from 'routes';

import {
  MainPage,
  NotFoundPage,
  SignUpPage,
  SignInPage,
  SingleBoardPage,
  TemplatePage,
} from 'pages/';

import { REACT_APP_BASENAME as BASENAME } from './data/constants';

const BoardsPage = lazy(() => import('pages/BoardsPage'));
const UserPage = lazy(() => import('pages/UserPage'));

const App = () => {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<TemplatePage />}>
          <Route path="/" element={<MainPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="boards" element={<BoardsPage />} />
            <Route path="boards/:boardId" element={<SingleBoardPage />} />
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
