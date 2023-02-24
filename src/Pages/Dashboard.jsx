import { useState, useEffect } from 'react'
import AddPhotoButton from '../components/AddPhotoButton';
import AddCategoryButton from '../components/AddCategoryButton';
import PictureList from '../components/PicturesList';
import CategoryList from '../components/CategoryList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';

const Dashboard = () => {

    const [categories, setCategories] = useState(null);
    const [categoryActive, setCategoryActive] = useState(null);
    const [pics, setPics] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingPics, setLoadingPics] = useState(true);

    async function cambiarEstado(_id) {
        setLoadingPics(true);        
        const saved = await UserServices.saveActiveCategory(_id);

        if (saved.updated) {
            const res = await UserServices.getCategories();
            setCategories(res.userCategories);

            // si existen categorias se busca el activo
            if (res.userCategories) {
                setCategoryActive(res.userCategories.find((c) => c.isActive == true));
            } else {
                setCategoryActive(null);
            }
        }
    }

    async function deleteUser(userId) {
        setLoadingPics(true);
        const deleted = await UserServices.deleteUser(userId);

        if (deleted.ok) {
            await pictureServices.deleteAllPictures(userId);
            setPics([]);
            const users = await UserServices.getUsers();
            setDataUsers(users);
            setCategoryActive(null);
        } else {
            alert('No se pudo borrar el usuario.');
        }
        setLoadingPics(false);
    }

    async function deletePicture(public_id) {
        const deleted = await pictureServices.deleteOnePicture(categoryActive._id, public_id);

        if (deleted.data.ok) {
            getPics();
        } else {
            alert('No se pudo borrar la imagen.');
        }
    }

    // 1° se piden los datos del usuario
    useEffect(() => {
        async function fetchData() {
            const res = await UserServices.getCategories();
            console.log('res ',res);
            setCategories(res.userCategories);

            // si existen categorias se busca el activo
            if (res.userCategories) {
                setCategoryActive(res.userCategories.find((c) => c.isActive == true));
            } else {
                setCategoryActive(null);
            }
            setLoadingCategories(false);
        }
        fetchData();
    }, []);

    const getCategoryPics = async () => {
        // si hay una categoria activa se buscan las imagenes de la categoria.
        if (categoryActive) {   
            let response = await pictureServices.getPictures(categoryActive.category_id); // se obtienen las imagenes de la categoria activa
            if (response) {
                setPics(response.data.images);
                setTimeout(() => {
                    setLoadingPics(false);
                }, 200);
            }
        }else{
            setLoadingPics(false);
        }
    }

    // actualiza las imagenes. cuando se actualiza el usuario activo se obtienen las url de las imagenes
    useEffect(() => {
        setLoadingPics(true);
        setPics([]);
        getCategoryPics();        

    }, [categoryActive]);

    return (
        <main className='flex flex-row justify-between m-1 md:m-2 gap-1 md:gap-2'>

            <aside className='border-primary bg-secondary md:bg-secondary-md basis-1/4 h-[90vh]'>
                <AddCategoryButton />
                {
                    loadingCategories ? <Loading small={true} /> : <CategoryList categories={categories} cambiarEstado={cambiarEstado} deleteUser={deleteUser} />
                }
            </aside>

            <article className='border-primary bg-secondary md:bg-secondary-md basis-3/4 h-[90vh]'>
                {
                    // si hay una categoria seleccionada se muestra el boton de agregar imagen
                    categoryActive ? <AddPhotoButton categoryActive={categoryActive} /> : <></>
                }
                {
                    loadingPics ? <Loading /> : <PictureList pictures={pics} deletePicture={deletePicture} />
                }

            </article>

        </main>
    )
}

export default Dashboard;