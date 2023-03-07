import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AddPhotoButton from '../components/AddPhotoButton';
import AddUserButton from '../components/AddCategoryButton';
import PictureList from '../components/PicturesList';
import CategoryList from '../components/CategoryList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';

const Search = () => {

    const { state } = useLocation();
    const { searchCategory } = state;     // contiene el texto ingresado en el input de busqueda del navbar

    const [categories, setCategories] = useState(null);
    const [categoryActive, setCategoryActive] = useState(null);
    const [pics, setPics] = useState([null]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [loadingPics, setLoadingPics] = useState(true);


    function filtrarBusqueda(categoryList) {
        let result = categoryList.filter((elem) => {
            return elem.categoryName.toLowerCase().includes(searchCategory.toLowerCase());
        })
        result = result.map((c)=>{
            if(c.isActive){
                c.isActive = false;
            }
            return c;
        });
        return result;
    }

    async function cambiarEstado(_id) {
        setLoadingPics(true);
        let categoriesAux = await categories.map((c)=> {
            if(c.isActive == true){
                c.isActive = false;
            }
            return c;
        });
        categoriesAux = await categoriesAux.map((c)=> {
            if(c.category_id == _id){
                c.isActive = true;
                setCategoryActive(c);
            }
            return c;
        });

        if(categoryActive && categoryActive.category_id == _id){
            setTimeout(() => {
                setLoadingPics(false);
            }, 200);
        }
        setCategories(categoriesAux);
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
        const resFiltrado = await filtrarBusqueda(res.userCategories);

        setCategories(resFiltrado);
        setCategoryActive(null);
        setLoadingCategories(false);
    }

    // 1° se piden los datos del usuario y se filtra la categoria buscada
    useEffect(() => {
        setLoadingCategories(true);
        setLoadingPics(true);
        fetchDataUser();
    }, [searchCategory]);

    const getCategoryPics = async () => {
        // si hay una categoria activa se buscan las imagenes de la categoria.
        if (categoryActive) {
            const response = await pictureServices.getPictures(categoryActive.category_id); // se obtienen las imagenes de la categoria activa
            
            if (await response) {
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
            <p className='border-primary bg-secondary md:bg-secondary-md m-1 md:m-2 p-2'>
                Resultados para: <span className='font-semibold'> {searchCategory} </span>
            </p>
            <main className='flex flex-row justify-between m-1 md:m-2 gap-1 md:gap-2 '>
                <aside className=' border-primary bg-secondary md:bg-secondary-md basis-1/4 h-[90vh]'>
                    {
                        loadingCategories ? <Loading small={true} /> : <CategoryList categories={categories} cambiarEstado={cambiarEstado} deleteCategory={deleteCategory} />
                    }
                </aside>

                <article className=' border-primary bg-secondary md:bg-secondary-md basis-3/4 h-[90vh]'>
                    {
                        loadingPics ? <Loading /> : <PictureList pictures={pics} deletePicture={deletePicture} />
                    }
                </article>

            </main>
        </div >
    )
}

export default Search;