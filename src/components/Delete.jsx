import deleteIcon from '../icons/deleteIcon.svg';
import ModalDelete from './ModalDelete';
import { useState } from 'react';

const Delete = ({ user, deleteUser }) => {
    const [showDelete, setShowDelete] = useState(false);

    const handleDelete = () => {
        setShowDelete(true);
    }

    return (
        <>
            <img src={deleteIcon} className='h-7 hover:cursor-pointer' onClick={handleDelete}></img>
            {
                showDelete? <ModalDelete setShowDelete={setShowDelete} user={user} deleteUser= {deleteUser}/> : <></>
            }
        </>
    )
}

export default Delete;