
// const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
const URI = 'https://localhost:3000'; // en desarrollo
// const URI = 'https://album-fotos-backend-production.up.railway.app/api/users';
// const URI = 'https://albumfotos-api.onrender.com/api/login'

const LoginServices = {};

LoginServices.isLogged = async() => {
    try {
        const response = await fetch(URI+'/api/login/' , {
            method: 'GET',
            credentials: 'include',
        });
        return response;

    }catch(error){
        return null;
    }
}

LoginServices.login = async (username, password) => {
    try {
        const response = await fetch(URI+'/api/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

LoginServices.logout = async () => {
    try {
        const response = await fetch(URI+'/api/login/', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}



export default LoginServices;