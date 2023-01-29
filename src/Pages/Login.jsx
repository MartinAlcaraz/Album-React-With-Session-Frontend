import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import LoginServices from '../services/LoginServices';
import ModalLoading from '../components/ModalLoading';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, setError, trigger, formState: { errors } } = useForm();

    const navigate = useNavigate();
    const [showLoading, setShowLoading] = React.useState(false);

    const onsubmit = async (data, e) => {
        // const formData = new FormData()
        // formData.append('username', data.nombre);
        // formData.append('password', data.password );

        setShowLoading(true);   //  se muestra la animacion de loading
        const res = await LoginServices.login(data.nombre, data.password);
        console.log(res);
        if (res.status == 200) {
            setShowLoading(false);
            navigate("/dashboard");
        } else {
            setShowLoading(false);
            // set login error
            setError('password',{ message: 'Username or password invalid.'});
        }
    }

    return (
        <div className='rounded-md bg-primary bg-secondary md:bg-secondary-md p-8 pt-4 m-2 min-h-[65vh]'>

            {
                showLoading ? <ModalLoading /> : <></>
            }

            <h2 className='mx-auto text-center text-2xl font-semibold'>Login</h2>

            <form onSubmit={handleSubmit(onsubmit)} className="my-4 mx-auto flex flex-col items-center">

                    <input type='text' name="nombre" className="p-2 m-2 rounded-md" placeholder="Nombre de usuario" autoFocus={true}
                        {...register('nombre', {
                            required: "El nombre es requerido"
                        })}
                    />
                    {
                        errors.nombre ? <div className='text-sm font-medium text-rose-700/90 md:text-rose-500/90 text-center'>{errors.nombre.message}</div> : <></>
                    }


                    <input type='password' name="password" className="p-2 m-2 rounded-md" placeholder="Contraseña"
                        {...register('password', {
                            required: "El password es requerido"
                        })}
                    />
                    {
                        errors.password ? <div className='text-sm font-medium text-rose-700/90 md:text-rose-500/90 text-center '>{errors.password.message}</div> : <></>
                    }

                    <input type="submit" className="button-primary" value="Login" />
                
            </form>
        </div>
    )
}

export default Login;