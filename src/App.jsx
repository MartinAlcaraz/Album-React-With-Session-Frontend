import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddCategory from './Pages/AddCategory';
import AddPhotos from './Pages/AddPhotos';
import NotFound from './Pages/NotFound';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Dashboard from './Pages/Dashboard';
import Main from './Pages/Main';
import ProtectedRoutes from './components/ProtectedRoutes';
import ModalExpiredLoggin from './components/ModalExpiredLoggin';
import { useState, useContext } from 'react';
import { UserContext } from './context/UserContext';

function App() {

  const { user, showModalExpiredLoggin, setShowModalExpiredLoggin } = useContext(UserContext);

  return (
    <BrowserRouter>
      <div className='h-full min-h-[98vh]'>
       
        {/* si expira la sesion se cierra la misma y se muestra el mensaje de cierre de sesion. */}
        {showModalExpiredLoggin ? <ModalExpiredLoggin setShowModalExpiredLoggin={setShowModalExpiredLoggin} /> : <></>}

        <NavBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route element={<ProtectedRoutes user={user} />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/addCategory' element={<AddCategory />} />
            <Route path='/addPhotos/:id' element={<AddPhotos />} />
            <Route path='/search' element={<Search />} />
          </Route>

          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App;
