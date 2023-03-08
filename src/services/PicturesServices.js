import axios from "axios";

// const URI = 'https://localhost:3000';               //  si estamos en un servidor para produccion se deja asi   = '/api/pictures'
//const URI = 'http://localhost:3000/api/pictures';     //  si estamos en desarrollo en el localhost
// const URI = 'https://api-album-react-with-session-backend.onrender.com';
import URI from "./URI.js";


const pictureServices = {};

pictureServices.postPicture = async ( newPictureOfUser ) => {
    
    try {
        const response = await fetch(URI+'/api/pictures/', {
            method: 'POST',
            credentials: 'include',
            // headers: {
            //     'Content-Type': 'application/json'            
            // },
            body: newPictureOfUser
        });
        const data = await response.json();
        if(response.status != 200){ 
            console.log('Status: ', response.status, ' \n Message: ', data.message); 
        }
        return data;
    } catch (error) {
        console.log('errror  ',error);
        return null;
    }
    
}

pictureServices.getPictures = async (category_id) => {   // retorna un arreglo de las imagenes de un usuario

    try {
        const response = await fetch(URI+'/api/pictures/'+category_id, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if(response.status != 200){ 
            console.log('Status: ', response.status, ' \n Message: ', data.message); 
        }
        return data;
    } catch (error) {
        console.log('errror  ',error);
        return null;
    }
}

pictureServices.deleteOnePicture = async (category_id, img_public_id) => {

    const formData = new FormData();
    formData.append('img_public_id', img_public_id);
    try {
        const response = await fetch(URI+'/api/pictures/'+category_id, {
            method: 'DELETE',
            credentials: 'include',
            body: formData
        });

        const data = await response.json();
        if(response.status != 200){ 
            console.log('Status: ', response.status, ' \n Message: ', data.message); 
        }
        console.log('data', data);
        console.log('response', response);

        return data;
    } catch (error) {
        console.log('errror  ',error);
        return null;
    }
}

pictureServices.deleteAllPictures = async (category_id) => {
    
    const res = await axios.delete(`${URI}/${category_id}`);
    return res;
}

export default pictureServices;