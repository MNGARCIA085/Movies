import React from 'react';
import { useLocation, useNavigate} from "react-router-dom";


const LogoutLink = () => {

   const navigate = useNavigate(); // for navigation

   const location = useLocation();


  const handleLogout = () => {
    // Aquí deberás implementar la lógica para realizar el logout.
    // Puede ser a través de una llamada a una API para cerrar sesión en el backend,
    // o simplemente borrando los datos de la sesión almacenados en el cliente.
    // Por ejemplo, si utilizas localStorage:
    localStorage.removeItem('access_token'); // Borra el token de autenticación (si lo tienes).
    // Otros pasos para limpiar el estado de la sesión y redirigir al usuario a la página de inicio de sesión

    
    //navigate('/login/', { replace: true });
    if (location.pathname.includes('admin')){
        window.location.href = '/admin/login';
    } else{
      window.location.href = '/login';
    }

  };

  return (
    <a href="#" onClick={handleLogout} style={{ color: 'inherit', textDecoration: 'none' }}>
      Log out
    </a>
  );
};

export default LogoutLink;
