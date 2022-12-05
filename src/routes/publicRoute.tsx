import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';

const PublicRoute = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return isAuthorized ? <Navigate replace to="/" /> : <Outlet />;
};

export default PublicRoute;
