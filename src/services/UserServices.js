import axios from "axios";

// const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
const URI = 'https://localhost:3000/api/users'; // en desarrollo
// const URI = 'https://album-fotos-backend-production.up.railway.app/api/users';
// const URI = 'https://albumfotos-api.onrender.com/api/users'

const UserServices = {};

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

UserServices.saveActiveUser = async (_id) => {
    const res = await axios.put(`${URI}/${_id}`, { id: _id });
    return res.data.message;
}


export default UserServices;