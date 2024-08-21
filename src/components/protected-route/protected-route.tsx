import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { useLocation, Navigate } from 'react-router-dom';
import { Preloader } from '@ui';

type TProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRoute): ReactElement => {
  const location = useLocation();
  const from = location.state?.from || { pathname: '/' };
  const isAuth = useSelector((state) => state.auth.isAuthRequest);
  const isLogin = useSelector((state) => state.auth.isLoginRequest);
  const user = useSelector((state) => state.auth.userData.email);

  if (user && onlyUnAuth) {
    return <Navigate to={from} state={location} replace />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (isLogin && !isAuth) {
    return <Preloader />;
  }

  return children;
};
