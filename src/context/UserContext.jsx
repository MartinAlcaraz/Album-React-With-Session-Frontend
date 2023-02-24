import LoginServices from '../services/LoginServices.js';
import { useState, useEffect } from 'react'
import { createContext } from 'react';

export const UserContext = createContext();  // nombre del contexto  // UserContext.Provider contiene las variables que se pasan como parametros

export function UserContextProvider(props) {    // componente que contiene el contexto

    let u = JSON.parse(localStorage.getItem('user'));
    
    const [user, setUser] = useState(u);         // se crea la variable de estado global como user = false

    const [showModalExpiredLoggin, setShowModalExpiredLoggin] = useState(false);

    const checkIsLogged = async () => {
        let u = JSON.parse(localStorage.getItem('user'));
        setUser (u);
        if ( u.logged == true ) {
            const response = await LoginServices.isLogged();
            if (response.status == 200) {
                console.log('Is logged');
            } else {
                console.log('Is not logged');
                setShowModalExpiredLoggin(true);
                setUnloggedUser();
            }
        }else{
            setUser({ logged : false });
        }
    }

    useEffect(()=>{
        setInterval(() => {
            checkIsLogged();
        }, 10000);
    },[]);
    
    const setLoggedUser = async (data) => {
        console.log('setLoggedUser true');
        const dataUser = { logged : data.ok, username: data.username, imgUrl: data.imageUrl };
        localStorage.setItem('user', JSON.stringify(dataUser));
        setUser(dataUser);
    }

    const setUnloggedUser = () => {
        LoginServices.logout();
        localStorage.setItem('user', JSON.stringify({ logged : false }));
        setUser({ logged : false });
    }

    return (
        <UserContext.Provider value={{ user, setLoggedUser, setUnloggedUser, showModalExpiredLoggin, setShowModalExpiredLoggin }}>
            {props.children}
        </UserContext.Provider>
    )
}