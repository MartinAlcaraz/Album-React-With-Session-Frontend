import Delete from "./Delete";

const User = ({ user, cambiarEstado, deleteUser }) => {

    let classActive = user.active ? 'active' : 'disabled';

    const handleClick = () => {
        if (user.active == false)
            cambiarEstado(user._id);
    }

    return (
        <div className='flex flex-col items-center h-40 my-8 snap-start shrink-0'>
            <h3 className='text-center capitalize font-medium'>{user.userName}</h3>
            <picture className={classActive} onClick={handleClick}>
                <img className='rounded-full w-20 h-20 md:w-24 md:h-24 border-2 border-gray-400 hover:border-white hover:cursor-pointer' src={user.imageUrl} />
            </picture>
            {
                // si el usuario esta activo se muestra el icono de eliminar.
                user.active? <Delete user= {user} deleteUser={ deleteUser }/>: <p className='h-7'></p>
            }
        </div>
    )
}

export default User;