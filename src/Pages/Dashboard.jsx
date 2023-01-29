import { useState, useEffect } from 'react'
import AddPhotoButton from '../components/AddPhotoButton';
import AddUserButton from '../components/AddUserButton';
import PictureList from '../components/PicturesList';
import UsersList from '../components/UsersList';
import Loading from '../components/Loading.jsx';
import UserServices from '../services/UserServices.js';
import pictureServices from '../services/PicturesServices.js';

const Dashboard = () => {

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
            if (users) {
                setDataUsers(users);
                // si existen usuarios se busca el activo
                if (users) {
                    setUserActive(users.find((u) => u.active == true));
                } else {
                    setUserActive(null);
                }
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
            setDataUsers(users);
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

    // 1° se piden los datos de los usuarios
    useEffect(() => {
        async function fetchData() {
            const users = await UserServices.getUsers();
            setDataUsers(users);

            // si existen usuarios se busca el activo
            if (users) {
                setUserActive(users.find((u) => u.active == true));
            } else {
                setUserActive(null);
            }
            setLoadingUsers(false);
        }
        fetchData();
    }, []);

    const getPics = async () => {
        if (userActive) {
            let pictures = await pictureServices.getPictures(userActive._id); // se obtienen las imagenes del usuario activo
            if (pictures) {
                setUserPics(pictures.data.images);
                setTimeout(() => {
                    setLoadingPics(false);
                }, 200);
            }
        }
    }

    // actualiza las imagenes. cuando se actualiza el usuario activo se obtienen las url de las imagenes
    useEffect(() => {
        setLoadingPics(true);
        setUserPics([]);
        getPics();        

    }, [userActive]);

    return (
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
    )
}

export default Dashboard;