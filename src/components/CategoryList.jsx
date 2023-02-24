import Category from './Category';

const CategoryList = ({ categories = [], cambiarEstado, deleteUser }) => {

    if ( categories.length == 0 ) {
        return <p className='text-white text-center'>No existen categorias.</p>
    }

    return (
        <div className='mt-[-70px] snap-y flex-col h-full overflow-scroll scrollbar-hide'>
            {
                categories.map(c => {
                    return <Category  key={c._id} category={c}  cambiarEstado={cambiarEstado} deleteUser= {deleteUser}/>
                })
            }
            <div className='h-16'></div>
        </div>
    )
}

export default CategoryList;