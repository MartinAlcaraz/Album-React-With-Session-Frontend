import { useState } from "react";

const ModalDelete = ({ setShowDelete, user, deleteUser }) => {

    const claseAnimacionIn = 'animacion-in';    // animacion para la entrada de la ventana
    const claseAnimacionOut = 'animacion-out';  // animacion para la salida de la ventana

    const [animacion, setAnimacion] = useState(claseAnimacionIn);

    function Eliminar() {
        setAnimacion(claseAnimacionOut);
        deleteUser(user._id);
        setTimeout(() => {
            setShowDelete(false);
        }, 600);
    }
    
    function Cancelar() {
        setAnimacion(claseAnimacionOut);
        setTimeout(() => {
            setShowDelete(false);
        }, 600);    // al desaparecer la ventana modal se elimina el componente del DOM
    }

    return (
        <div className={ "bg-black/50 fixed h-screen w-screen top-0 left-0 z-20 pt-[30vh] "+ animacion}>
            <div className="m-auto w-3/4">
                <p className="text-center p-4 mx-auto bg-primary border-primary">Eliminar el usuario <strong>{user.userName}</strong>?</p>
                <div className="flex justify-around">
                    <button className="button-primary w-1/3 " onClick={Eliminar}>Si</button>
                    <button className="button-primary w-1/3 " onClick={Cancelar}>No</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;