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
import { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function App() {

  const { user, showModalExpiredLoggin, setShowModalExpiredLoggin } = useContext(UserContext);
  const [onLine, setOnLine] = useState(true);
  const [classShowMessageOffLine, setClassShowMessageOffLine] = useState('hidden');

  useEffect(() => {
    setOnLine(navigator.onLine);

    if(!navigator.onLine){  // si está offline se muestra el mensaje
      setClassShowMessageOffLine('block');
    }

    if (navigator.onLine) { // si esta onLine se oculta el mensaje, si no, no se oculta.
      setTimeout(() => {
        setClassShowMessageOffLine('hidden');
      }, 3000);
    }
  }, [navigator.onLine]);

  return (
    <BrowserRouter>
      <div className='h-full min-h-[98vh]'>

        {/* si expira la sesion se cierra la misma y se muestra el mensaje de cierre de sesion. */}
        {showModalExpiredLoggin ? <ModalExpiredLoggin setShowModalExpiredLoggin={setShowModalExpiredLoggin} /> : <></>}

        <div className={classShowMessageOffLine + " fixed top-0 left-0 w-full"}>
          {
            onLine ?
              <div className='bg-green-400 text-gray-50 text-center p-2'> Online!!!</div>
              :
              <div className='bg-red-500 text-gray-50 font-medium p-2'>You are offline...</div>
          }
        </div>

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
