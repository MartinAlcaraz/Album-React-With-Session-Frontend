import axios from "axios";

// const URI = 'https://localhost:3000/api/register'; // en desarrollo
const URI = 'https://api-album-react-with-session-backend.onrender.com';


const RegisterServices = {};

RegisterServices.register = async (newUser) => {   
    const response = await axios.post(URI+'/api/register', newUser);
    return response;
}

export default RegisterServices;