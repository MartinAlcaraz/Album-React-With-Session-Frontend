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
    const [userInfo, setUserInfo] = useState(null);
    const [loadingImg, setLoadingImg] = useState(false);
    const buttonRef = useRef();
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {   // se obtienen los datos del usuario seleccionado para subir fotos
        async function getUserInfo() {
            const user = await UserServices.getOneUser(params.id);
            setUserInfo(user);
        }
        getUserInfo();
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
        formData.append('userId', params.id);
        formData.append('image', data.inputFile[0]);

        setShowLoading(true);
        const response = await pictureServices.postPicture(formData);
                
        if (response.data.updated == true) {
            setShowLoading(false);
            navigate("/dashboard");
        }else{
            setShowLoading(false);
            navigate("/404");
        }
    }

    return (
        <div className='m-2 min-h-[80vh] p-10 bg-secondary md:bg-secondary-md border-primary'>
            {
                showLoading? <ModalLoading /> : <></>
            }

            <h2 className='px-4 leading-4 text-xl md:mb-1 md:text-2xl font-semibold text-center '>Agregar foto de <strong>{userInfo?.userName}</strong> <img src={userInfo?.img} className="h-20 inline" /></h2>
            <form onSubmit={handleSubmit(agregarFoto)} className='p-4 pt-0 flex flex-col md:flex-row-reverse'>
                <div className='basis-2/3'>
                    {
                        loadingImg ? <Loading /> :
                            <div className='h-full hover:cursor-pointer' onClick={addImage} >
                                <img src={selectedImg} className="min-h-[40vh] h-full mx-auto" />
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

                    <input type="submit" ref={buttonRef} value="Agregar foto al Album" className='button-primary bg-blue-700 text-base' />

                    <p className="h-4 text-sm text-rose-500 text-center">{errors?.inputFile ? errors.inputFile.message : ""}</p>

                </div>
            </form>
        </div>
    )
}

export default AddPhotos;