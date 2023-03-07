import React from "react";
import { useState } from "react"
import ModalView from "./ModalView"

const Picture = ({ url, img_public_id, deletePicture }) => {

    const [modalView, setModalView] = useState(false);

    const imgOnClick = () => {
        setModalView(true);
    }
    
    return (
        <div className="my-2 md:my-8 md:mx-4 h-56 md:h-72 snap-center shrink-0">
            {
                modalView ? <ModalView url={url} setModalView={setModalView} deletePicture={deletePicture} img_public_id={img_public_id} /> : <></>
            }
            
            <img onClick={imgOnClick} className="h-full w-full md:max-w-[90%] mx-auto object-contain cursor-pointer" src={url} />
        </div>
    )
}


export default Picture;