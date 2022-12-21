import axios from "axios";

// const URI = '/api/pictures';                //  si estamos en un servidor para produccion se deja asi   = '/api/pictures'
//const URI = 'http://localhost:3000/api/pictures';     //  si estamos en desarrollo en el localhost
const URI = 'https://albumfotos-api.onrender.com/api/pictures'

const pictureServices = {};

pictureServices.postPicture = async ( newPictureOfUser ) => {
    const res = await axios.post( URI, newPictureOfUser );
    return res;
}

pictureServices.getPictures = async (userId) => {   // retorna un arreglo de las imagenes de un usuario
    const response = await axios.get(`${URI}/${userId}`);
    return response;
}



pictureServices.deleteOnePicture = async (userId, img_id) => {

    const res = await axios.patch(`${URI}/${userId}`, { img_id : img_id } );
    return res;
}

pictureServices.deleteAllPictures = async (userId) => {
    
    const res = await axios.delete(`${URI}/${userId}`);
    return res;
}

export default pictureServices;