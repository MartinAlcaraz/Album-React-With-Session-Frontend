import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AddUser from './Pages/AddUser';
import AddPhotos from './Pages/AddPhotos';
import NotFound from './Pages/NotFound';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Search from './Pages/Search';
import Dashboard from './Pages/Dashboard';
import Main from './Pages/Main';
import ProtectedRoutes from './components/ProtectedRoutes';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState(false);

  return (

    <BrowserRouter>
      <div className='h-full min-h-[98vh]'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          <Route element={ <ProtectedRoutes user={user}/>}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/adduser' element={<AddUser />} />
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
