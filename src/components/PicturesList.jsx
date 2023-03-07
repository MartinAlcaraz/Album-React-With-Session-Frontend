import React from "react";
import Picture from "./Picture";

const PictureList = ({ pictures = [], deletePicture }) => {

    if (pictures.length == 0) {
        return (
            <span className="px-auto">No hay fotos agregadas</span>
        )
    }

    return (
        <div className='snap-y flex-col h-full overflow-auto scrollbar-hide p-1 '>
            {
                pictures.map((data, index) => {
                    let img = new Image();
                    img.src = data.imgUrl;
                    return img.onload = <Picture key={index} url={data.imgUrl} img_public_id={data.img_public_id} deletePicture={deletePicture} />
                })
            }
        </div>
    )
}


export default PictureList;