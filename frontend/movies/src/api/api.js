import axios from 'axios';


export const consume_service = async(url, method, jwtToken, data,auth=false) => {
    
    let config = {};
    if (auth){
        config = {
            headers: {
              Authorization: `Bearer ${jwtToken}` // Agrega "Bearer" antes del JWT
            }
        };
    }

    // diferentes métodos
    if (method==='post'){
        return await axios.post(
            url,
            data,
            config
        )
    }
    else if (method==='put'){
        return await axios.put(
            url,
            data,
            config
        )
    }
    else if (method==='get'){
        return await axios.get(url);
    }
    else if (method==='delete'){
        return await axios.delete(
            url,
            config
        );
    }



}