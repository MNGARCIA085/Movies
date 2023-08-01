import { Navigate } from "react-router";


const ProtectedRoute = ({
    user,
    groups,
    redirectPath = '/login',
    children,
  }) => {





    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    else if (!groups) {
      return <Navigate to={redirectPath} replace />;
    }
    else if (!groups.includes('admin')) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };


export default ProtectedRoute;



