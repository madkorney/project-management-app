import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute, PublicRoute } from 'routes';

import { MainPage, NotFoundPage, TemplatePage } from 'pages';

const SignUpPage = lazy(() => import('pages/SignUpPage'));
const SignInPage = lazy(() => import('pages/SignInPage'));
const BoardsPage = lazy(() => import('pages/BoardsPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const SingleBoardPage = lazy(() => import('pages/SingleBoardPage'));

const App = () => {
  return (
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
  );
};

export default App;
