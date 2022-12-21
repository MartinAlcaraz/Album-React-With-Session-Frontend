import User from './User';

const UsersList = ({ users = [], cambiarEstado, deleteUser }) => {

    if ( users.length == 0 ) {
        //console.log('No existen usuarios.')
        return <p className='text-white text-center'>No existen usuarios</p>
    }

    return (
        <div className='mt-[-70px] snap-y flex-col h-full overflow-scroll scrollbar-hide'>
            {
                users.map(u => {
                    return <User  key={u._id} user={u}  cambiarEstado={cambiarEstado} deleteUser= {deleteUser}/>
                })
            }
            <div className='h-16'></div>
        </div>
    )
}

export default UsersList;