// const URI = '/api/users';                //  si estamos en un servidor para produccion se deja asi   = '/api/users'
// const URI = 'https://localhost:3000'; // en desarrollo
// const URI = 'https://api-album-react-with-session-backend.onrender.com';
import URI from "./URI.js";

const CategoryServices = {};

CategoryServices.deleteCategory = async (category) => {

    const formData = new FormData();
    formData.append('category_img_public_id', category.category_img_public_id);

    try {
        const response = await fetch(URI + `/api/category/${category.category_id}`, {
            method: 'DELETE',
            credentials: 'include',
            body: formData
        });
        const data = await response.json();
        return data;
    } catch (err) {
        return null;
    }
}


export default CategoryServices;