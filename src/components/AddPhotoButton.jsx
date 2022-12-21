import addIcon from '../icons/AddIcon.svg'
import { Link } from 'react-router-dom'

const AddPhotoButton = ({user}) => {
    return (
        <div className='sticky top-[85%] left-[89%] mb-2 inline-block rounded-full text-4xl font-semibold boton-transparente'>
            <Link to={`/addPhotos/${user._id}`} title='Add Photo'>
                <img src={addIcon} className='p-4'/>
            </Link>
        </div>
    )
}

export default AddPhotoButton;

