import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({user}) => {

    if( !user ){
        return <Navigate to='/'/>
    }else{
        return <Outlet/>
    }
  
}

export default ProtectedRoutes;