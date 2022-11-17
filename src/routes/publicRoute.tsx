import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

const PublicRoute = () => {
  const isAuthorized = useAppSelector((state) => state.authorized.userAuthorized);

  return isAuthorized ? <Navigate replace to="/" /> : <Outlet />;
};

export default PublicRoute;
