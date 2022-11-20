import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks';

const PrivateRoute = () => {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);

  return isAuthorized ? <Outlet /> : <Navigate replace to="/" />;
};

export default PrivateRoute;
