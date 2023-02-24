import React from "react";
import Picture from "./Picture";

const PictureList = ({ pictures = [], deletePicture }) => {

    if (pictures.length == 0) {
        return (
            <span className="px-auto">No hay fotos agregadas</span>
        )
    }

    return (
        <div className='snap-y flex-col h-full overflow-auto scrollbar-hide p-1 mt-[-70px]'>
            {
                pictures.map((data, index) => {
                    let img = new Image();
                    img.src = data.imgUrl;
                    return img.onload = <Picture key={index} url={data.imgUrl} public_id={data.public_id} deletePicture={deletePicture} />
                })
            }
            <div className='h-16'></div>
        </div>
    )
}


export default PictureList;