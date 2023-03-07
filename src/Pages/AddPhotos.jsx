import iconImage from '../icons/imageIcon.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'
import Loading from '../components/Loading'
import ModalLoading from '../components/ModalLoading'
import { useForm } from 'react-hook-form'
import UserServices from '../services/UserServices.js'
import pictureServices from '../services/PicturesServices.js'

const AddPhotos = () => {
    const params = useParams();

    const { handleSubmit, register, formState: { errors, isSubmitSuccessful }, setFocus, trigger, } = useForm();

    const navigate = useNavigate();

    const [selectedImg, setSelectedImg] = useState(iconImage);  // foto subida por el usuario
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);
    const buttonRef = useRef();
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {   // se obtienen los datos de la categoria seleccionada para subir fotos
        async function getCategoryInfo() {
            const res = await UserServices.getCategoryInfo(params.id);
            // console.log('res ',res.oneCategory.categoryName );
            setCategoryInfo(res.oneCategory);
        }
        getCategoryInfo();
    }, []);

    async function cargarImagen(file) {
        // trigger comprueba los errores del input selecteFile  (es funcion asincrona )
        const archivoValido = await trigger("inputFile");
        setSelectedImg(null);

        if (archivoValido) {
            setLoadingImg(true);
            let reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (event) {
                let imagen = event.target.result;
                setSelectedImg(imagen);
                setLoadingImg(false);
            }
        }
    }

    function addImage(e) {
        e.preventDefault();
        const inputFile = document.querySelector("#inputFile");
        inputFile.click();
    }

    async function agregarFoto(data, e) {
        e.preventDefault();
        buttonRef.current.disabled = true;

        let formData = new FormData();
        formData.append('category_id', params.id);
        formData.append('image', data.inputFile[0]);

        setShowLoading(true);
        const response = await pictureServices.postPicture(formData);
                
        if (response.updated == true) {
            setShowLoading(false);
            navigate("/dashboard");
        }else{
            setShowLoading(false);
            navigate("/404");
        }
    }

    return (
        <div className='m-1 mt-0 min-h-[80vh] p-10 pt-4 bg-secondary md:bg-secondary-md border-primary'>
            {
                showLoading? <ModalLoading /> : <></>
            }
            
            <img src={categoryInfo?.imageUrl} className="h-20 w-20 mx-auto my-2 md:hidden" />
           
            <h2 className='px-4 leading-4 text-xl md:mb-1 md:text-2xl font-semibold text-center'>Agregar foto a la categoria <strong className='capitalize'>{categoryInfo?.categoryName}</strong> <img src={categoryInfo?.imageUrl} className="h-20 hidden md:inline" /></h2>
            <form onSubmit={handleSubmit(agregarFoto)} className='p-4 flex flex-col md:flex-row-reverse'>
                <div className='h-[35vh] basis-2/3'>
                    {
                        loadingImg ? <Loading /> :
                            <div className='h-full hover:cursor-pointer' onClick={addImage} >
                                <img src={selectedImg} className="max-h-[45vh] min-h-[30vh] mx-auto"/>
                            </div>
                    }
                </div>
                <div className='m-auto basis-1/3'>
                    <input type="file" className='hidden' id="inputFile" accept="image/jpeg, image/png"
                        {...register('inputFile', {
                            required: "Seleccione una imagen.",
                            validate: {
                                size: (value) => (value[0].size / 1024 < 2048) || "La imagen debe pesar menos de 2MB",
                                tipo: (value) => (["image/jpg", "image/jpeg", "image/png"].includes(value[0].type)) || "Elija otra imagen (.jpg, .jpeg ó .png)"
                            },
                            onChange: (value) => cargarImagen(value.target.files[0])
                        })} />

                    <input type="submit" ref={buttonRef} value="Agregar foto al Album" className='mt-4 button-primary bg-blue-700 text-base' />

                    <p className="h-4 text-sm text-rose-500 text-center">{errors?.inputFile ? errors.inputFile.message : ""}</p>

                </div>
            </form>
        </div>
    )
}

export default AddPhotos;