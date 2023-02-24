import axios from "axios";

// const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
const URI = 'https://localhost:3000'; // en desarrollo
// const URI = 'https://album-fotos-backend-production.up.railway.app/api/users';
// const URI = 'https://albumfotos-api.onrender.com/api/users'

const UserServices = {};

UserServices.postCategory = async (formData) => {   // agrega una categoria al usuario
    try {
        const response = await fetch(URI+'/api/category', {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}

UserServices.getCategories = async () => {   
    // retorna un array[] con las categorias del usuario que contienen las imagenes de cada categoria
    try {
        const response = await fetch(URI+`/api/category/` , {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }catch(err){
        return false;
    }
}

UserServices.getUsers = async () => {   // retorna un arreglo de usuarios
    const response = await axios.get(URI);
    const users = await response.data.users;
    return users;
}

UserServices.getOneUser = async (userId) => {   // retorna un solo usuario
    const response = await axios.get(`${URI}/${userId}`);
    const user = await response.data.user;
    return user;
}

UserServices.postUser = async (newUser) => {
    const res = await axios.post(URI, newUser );
    return res;   
}

UserServices.deleteUser = async (userId) => {
    const res = await axios.delete(`${URI}/${userId}`);
    const data = res.data;
    return data;
}

UserServices.saveActiveCategory = async (_id) => {
    console.log('id: ',_id)
    try {
        const response = await fetch(URI+`/api/category/${_id}` , {
            method: 'PUT',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }catch(err){
        return false;
    }
}

UserServices.getCategoryInfo = async (_id) => {
    try {
        const response = await fetch(URI+`/api/category/${_id}` , {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    }catch(err){
        return false;
    }
}

export default UserServices;