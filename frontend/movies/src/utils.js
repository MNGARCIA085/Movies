import jwt_decode from 'jwt-decode';

// decodificar el token de acceso para obtener info.adicional
export const decodeToken = (token) => {
  if ( token !== null) {
    const decodedToken = jwt_decode(token);
    return {
             'username':decodedToken.sub, 
             'id':decodedToken.id,
             'groups':decodedToken.groups,
           }
        }
  else {
    return {
        'username':null,
        'id':null,
        'groups':[]
    }
  }
  //console.log(decodedToken);
  //const userGroups = decodedToken.groups;
  //console.log("Grupos del usuario:", userGroups);
}








