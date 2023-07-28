import { Navigate } from "react-router";


const ProtectedRoute = ({
    user,
    redirectPath = '/login',
    children,
  }) => {

    console.log(user);

    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  };


export default ProtectedRoute;