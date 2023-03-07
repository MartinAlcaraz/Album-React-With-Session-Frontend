import { useState, useEffect } from 'react'
import AddPhotoButton from '../components/AddPhotoButton';
import AddCategoryButton from '../components/AddCategoryButton';
import PictureList from '../components/PicturesList';
import CategoryList from '../components/CategoryList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';
import CategoryServices from '../services/CategoryService';

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
        } else {
            console.log(saved.message);
        }

    }

    async function deleteCategory(category) {
        setLoadingPics(true);
        const response = await CategoryServices.deleteCategory(category);

        if (response.deleted) {
            setPics([]);    // se reinicia la lista de imagenes
            fetchDataUser();    // se vuelve a pedir los datos del usuario
        } else {
            alert('No se pudo borrar la categoria.');
        }
        setLoadingPics(false);
    }

    async function deletePicture(public_id) {
        const response = await pictureServices.deleteOnePicture(categoryActive.category_id, public_id);

        if (response.deleted) {
            getCategoryPics();
        } else {
            alert('No se pudo borrar la imagen.');
        }
    }

    async function fetchDataUser() {
        const res = await UserServices.getCategories();
        setCategories(res.userCategories);

        // si existen categorias se busca el activo
        if (res.userCategories) {
            setCategoryActive(res.userCategories.find((c) => c.isActive == true));
        } else {
            setCategoryActive(null);
        }
        setLoadingCategories(false);
    }

    // 1° se piden los datos del usuario
    useEffect(() => {
        fetchDataUser();
    }, []);

    const getCategoryPics = async () => {
        // si hay una categoria activa se buscan las imagenes de la categoria.
        if (categoryActive) {
            const response = await pictureServices.getPictures(categoryActive.category_id); // se obtienen las imagenes de la categoria activa

            if (response) {
                setPics(response.images);
                setTimeout(() => {
                    setLoadingPics(false);
                }, 200);
            }
        } else {
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
        <div className='h-full' >
            <main className='flex flex-row justify-between m-1 md:m-2 gap-1 md:gap-2'>

                <aside className=' border-primary bg-secondary md:bg-secondary-md basis-1/4 h-[90vh]'>
                    <AddCategoryButton />
                    <div className='mt-[-4.5rem] h-full'>
                        {
                            loadingCategories ? <Loading small={true} /> : <CategoryList categories={categories} cambiarEstado={cambiarEstado} deleteCategory={deleteCategory} />
                        }
                    </div>
                </aside>

                <article className=' border-primary bg-secondary md:bg-secondary-md basis-3/4 h-[90vh]'>

                    {
                        // si hay una categoria seleccionada se muestra el boton de agregar imagen
                        categoryActive ? <AddPhotoButton categoryActive={categoryActive} /> : <></>
                    }
                    <div className='mt-[-4.5rem] h-full'>
                        {
                            loadingPics ? <Loading /> : <PictureList pictures={pics} deletePicture={deletePicture} />
                        }
                    </div>

                </article>

            </main>
        </div >
    )
}

export default Dashboard;