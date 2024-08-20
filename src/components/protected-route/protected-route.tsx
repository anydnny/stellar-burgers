import { ReactElement } from 'react';

type ProtectedRoute = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};
export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRoute) => children;
