import icono from "../icons/react.svg";
import lensIcon from "../icons/lensIcon.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserServices from '../services/UserServices.js';
import { useState, useEffect, useRef } from 'react';
import ResultList from '../components/ResultList.jsx';

const NavBar = () => {

    const navigate = useNavigate();
    const inputRef = useRef();
    const [users, setUsers] = useState(null);
    const [text, setText] = useState("");
    const [showList, setShowList] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const location = useLocation();

    // se obtiene la lista de usuarios
    useEffect(() => {
        const getUsers = async () => {
            let res = await UserServices.getUsers();
            setUsers(res);
        }
        getUsers();
    }, []);

    // se muestra el input de busqueda solo en la pagina principal
    useEffect(() => {
        if (location.pathname == "/" || location.pathname == "/search") {
            setShowSearch(true);
        } else {
            setShowSearch(false);
        }
    }, [location]);

    const onSubmit = (e) => {
        e.preventDefault();
        navigate('/search', { state: { searchUser: inputRef.current.value } });
        inputRef.current.value = "";
        setShowList(false);
    }

    // se copia el texto seleccionado de la lista de resultados en el input text
    const setInputValue = (texto) => {
        inputRef.current.value = texto;
        setShowList(false);
        inputRef.current.focus();
    }

    const onChange = (e) => {
        let st = e.target.value;
        if (st == '') {
            setShowList(false)
        } else {
            setText(st);
            setShowList(true);
        }
    }

    return (
        <div className="bg-primary border-primary m-1 md:m-2 flex flex-col md:flex-row justify-around p-5 items-center z-10">
            <img src={icono} alt='icono react' className="spin-slow hidden md:block" />
            <Link to='/' className="font-serif text-4xl font-bold">Album</Link>
            {
                showSearch ? <form onSubmit={onSubmit} autoComplete="off" className="z-20">
                    <input type="text" onChange={onChange} name="buscador" placeholder="Buscar" ref={inputRef} required
                        className="border-2 border-gray-700 rounded-md px-2 relative inline" />
                    <button ><img src={lensIcon} className="inline h-6 w-6 cursor-pointer" /></button>
                    {showList ? <ResultList users={users} text={text} setInputValue={setInputValue} /> : <></>}
                </form> : <></>
            }
        </div>
    )
}

export default NavBar;