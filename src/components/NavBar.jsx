import reactIcon from "../icons/react.svg";
import lensIcon from "../icons/lensIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserServices from '../services/UserServices.js';
import LoginServices from "../services/LoginServices.js";
import { useState, useEffect, useRef, useContext } from 'react';
import ResultList from '../components/ResultList.jsx';
import { UserContext } from "../context/UserContext";
import { Button } from '@material-tailwind/react'

const NavBar = () => {

    const navigate = useNavigate();
    const inputRef = useRef();
    const [categoryList, setCategoryList] = useState(null);
    const [text, setText] = useState("");
    const [showList, setShowList] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();
    const { user, setUnloggedUser } = useContext(UserContext);

    const fetchCategories = async () => {
        const res = await UserServices.getCategories();
        setCategoryList(res.userCategories);
    }

    // se obtiene la lista de usuarios para la busqueda
    useEffect(() => {
        fetchCategories();
    }, []);

    // se muestra el input de busqueda solo en la pagina principal
    useEffect(() => {
        if (location.pathname == "/dashboard" || location.pathname == "/search") {
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    }, [location]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/search', { state: { searchCategory: inputRef.current.value } });
        inputRef.current.value = "";
        setShowList(false);
    }

    // se copia el texto seleccionado de la lista de resultados en el input text
    const setInputValue = (texto) => {
        inputRef.current.value = texto;
        setShowList(false);
        inputRef.current.focus();
    }

    const onFocus = ()=> {
        fetchCategories();
    }

    const onChange = (e) => {
        let st = e.target.value;
        if (st == '') {
            setShowList(false)
        } else {
            setText(st);
            if (categoryList != null || categoryList != undefined) {
                setShowList(true);
            }
        }
    }

    const logoutHandler = async () => {
        const res = await LoginServices.logout();

        if (res || !res) {
            setUnloggedUser();
            navigate('/');
        }
    }

    const onTitleClick = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    }


    return (
        <div className="z-10">

            <div className="bg-primary border-primary m-1 md:m-2 flex flex-col md:flex-row-reverse justify-between p-2 pt-0 md:pt-5 items-center">

                {
                    user.logged ?
                        <div className="mt-1 w-full md:w-auto flex justify-between md:justify-around">
                            <div className="flex flex-col  mx-4">
                                <img src={user.imgUrl} className='mx-4 w-12 rounded-full'></img>
                                <p className="text-center m-auto uppercase hidden md:block">{user.username}</p>
                            </div>
                            <div className="flex">
                                <Button onClick={logoutHandler} color='indigo' size="sm" className="m-auto">Logout</Button>
                            </div>
                        </div>
                        :
                        <div className="w-full md:w-auto flex justify-between">
                            <Button onClick={() => navigate('/register')} variant="outlined" color='white' size="sm" className="m-2">Registrarse</Button>
                            <Button onClick={() => navigate('/login')} color='green' size="sm" className="m-2">Login</Button>
                            <img src={reactIcon} alt='icono react' className="mx-4 spin-slow hidden md:block" />
                        </div>
                }

                <div className="mt-[-10px] mb-2 md:m-0 w-full md:w-auto flex flex-col justify-between items-center md:flex-row  md:items-end h-20 px-4">
                    <h1 onClick={onTitleClick} className="font-serif text-6xl font-bold hover:cursor-pointer">Album</h1>
                    {
                        showSearch ?
                            <form onSubmit={onSubmit} onFocus={onFocus} autoComplete="off" className="z-20 mx-0 pb-3 flex md:mx-8">
                                <input type="text" onChange={onChange} name="buscador" placeholder="Buscar categoria" ref={inputRef} required
                                    className="w-[150px] border-2 border-gray-700 rounded-md px-2" />
                                <button className="my-auto">
                                    <img src={lensIcon} className="h-6 w-6 cursor-pointer" />
                                </button>
                                {showList ? <ResultList categoryList={categoryList} text={text} setInputValue={setInputValue} /> : <></>}
                            </form> : <></>
                    }
                </div>

            </div>
        </div>
    )
}

export default NavBar;