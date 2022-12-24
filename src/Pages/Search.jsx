import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AddPhotoButton from '../components/AddPhotoButton';
import AddUserButton from '../components/AddUserButton';
import PictureList from '../components/PicturesList';
import UsersList from '../components/UsersList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';

const Search = () => {

    const { state } = useLocation();
    const { searchUser } = state;

    const [dataUsers, setDataUsers] = useState([]);
    const [userActive, setUserActive] = useState(null);
    const [userPics, setUserPics] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingPics, setLoadingPics] = useState(true);


    async function cambiarEstado(_id) {
        setLoadingPics(true);
        const saved = await UserServices.saveActiveUser(_id);
        if (saved) {
            const users = await UserServices.getUsers();
            const result = filtrarBusqueda(users);
            if (result) {
                setDataUsers(result);
                // si existen usuarios se busca el activo
                setUserActive(result.find((u) => u.active == true));
            } else {
                setUserActive(null);
            }
        }
    }

    async function deleteUser(userId) {
        setLoadingPics(true);
        const deleted = await UserServices.deleteUser(userId);

        if (deleted.ok) {
            await pictureServices.deleteAllPictures(userId);
            setUserPics([]);
            const users = await UserServices.getUsers();
            const result = filtrarBusqueda(users);
            setDataUsers(result);
            setUserActive(null);
        } else {
            alert('No se pudo borrar el usuario.');
        }
        setLoadingPics(false);
    }

    async function deletePicture(public_id) {
        const deleted = await pictureServices.deleteOnePicture(userActive._id, public_id);

        if (deleted.data.ok) {
            getPics();
        } else {
            alert('No se pudo borrar la imagen.');
        }
    }

    function filtrarBusqueda(users) {
        let result = users.filter((user) => {
            return user.userName.toLowerCase().includes(searchUser.toLowerCase())
        })
        return result;
    }

    // 1° se piden los datos de los usuarios
    useEffect(() => {
        async function fetchData() {
            setDataUsers([]);
            setUserPics([]);
            const users = await UserServices.getUsers();
            const result = filtrarBusqueda(users);
            setDataUsers(result);
            // setea al primer resultado como activo
            if (result.length > 0) {
                cambiarEstado(result[0]._id)
            }
            
            setLoadingUsers(false);
        }
        fetchData();
    }, [searchUser]);

    const getPics = async () => {
        if (userActive) {
            let pictures = await pictureServices.getPictures(userActive._id); // se obtienen las imagenes del usuario activo
            if (pictures) {
                setUserPics(pictures.data.images);
            }
        }
    }

    // actualiza las imagenes. cuando se actualiza el usuario activo se obtienen las url de las imagenes
    useEffect(() => {
        setLoadingPics(true);
        setUserPics([]);
        getPics();
        setLoadingPics(false);
    }, [userActive]);

    return (
        <div>
            <p className='border-primary bg-secondary md:bg-secondary-md m-1 md:m-2 p-2'>
                Resultados para: <span className='font-semibold capitalize'> {searchUser} </span>
            </p>
            <main className='flex flex-row justify-between m-1 md:m-2 gap-1 md:gap-2'>

                <aside className='border-primary bg-secondary md:bg-secondary-md basis-1/4 h-[90vh]'>
                    <AddUserButton />
                    {
                        loadingUsers ? <Loading small={true} /> : <UsersList users={dataUsers} cambiarEstado={cambiarEstado} deleteUser={deleteUser} />
                    }
                </aside>

                <article className='border-primary bg-secondary md:bg-secondary-md basis-3/4 h-[90vh]'>
                    {
                        // si hay un usuario seleccionado se muestra el boton de agregar imagen
                        userActive ? <AddPhotoButton user={userActive} /> : <></>
                    }
                    {
                        loadingPics ? <Loading /> : <PictureList userPictures={userPics} deletePicture={deletePicture} />
                    }

                </article>

            </main>
        </div>
    )
}

export default Search;