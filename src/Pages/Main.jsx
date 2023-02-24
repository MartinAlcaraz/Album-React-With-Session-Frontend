import React from 'react';
import album from '../assets/album.png'
const Main = () => {
    return (
        <div className='m-1 md:m-2 border-primary bg-secondary  md:bg-secondary-md h-[75vh]'>
            <h1 className='h-[10] text-center text-3xl font-semibold m-2 text-cyan-300'>Album de fotos</h1>
            <p className='h-[10] text-center text-cyan-300'>Crea tu album separando las imagenes por categorias!</p>
            <div className='m-auto w-[90vw] h-[80%] p-4'>
                <img src={album} className='object-contain w-full h-full' />
            </div>
        </div>
    )
}

export default Main