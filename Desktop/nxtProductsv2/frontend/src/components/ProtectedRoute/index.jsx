import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('jwt_token');

  if (!token) {
    console.log('No Token Found');
    return <Navigate to="/login" replace />;
  }

  console.log('Entered Protected Route.');
  return <Outlet />; // Outlet renders the child components of this route
};

export default ProtectedRoute;
