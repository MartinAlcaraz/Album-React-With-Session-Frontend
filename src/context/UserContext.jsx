import { useState, useEffect } from 'react'
import UserServices from '../services/UserServices.js';
import { createContext } from 'react';

export const UserContext = createContext();  // nombre del contexto  // TaskContext.Provider contiene las variables que se pasan como parametros


export function UserContextProvider(props) {    // componente que contiene el contexto

    const [dataUsers, setDataUsers] = useState([]);         // se crea la variable de estado global como tasks = []

    useEffect(async () => {		
        setDataUsers( await UserServices.getUsers() );
    }, []);

    // function createTask(tarea) {		// recibe  el objeto tarea desde taskForm
    //     const newTask = {
    //         id: tasks.length,
    //         nombre: tarea.texto,
    //         descripcion: tarea.descripcion
    //     }
    //     setTasks([...tasks, newTask]);	// se copian las tareas de tasks y se agrega la nueva en un nuevo arreglo
    // }

    // function deleteTask(idTask) {		// idTask es el id del objeto a eliminar
    //     const newTasks = tasks.filter((tarea) => { return tarea.id !== idTask }); // filter devuelve todas las tareas excepto la que tiene el id == a idTask
    //     setTasks(newTasks);												// se asigna un nuevo arreglo a la variable de estado tasks
    // }

    return (
        <UserContext.Provider value={{dataUsers}}> 
            {props.children}
        </UserContext.Provider>
    )
}