import axios from "axios";

const URI = 'https://localhost:3000/api/register'; // en desarrollo
// const URI = 'https://albumfotos-api.onrender.com/api/users'

const RegisterServices = {};

RegisterServices.register = async (newUser) => {   
    const response = await axios.post(URI, newUser);
    return response;
}

export default RegisterServices;