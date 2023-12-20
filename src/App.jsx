import { Routes, Route } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import './App.css'
import Home from './pages/Home';
import Favourite from './pages/Favourite';
import Pet from './pages/Pet';
import Navbar from './components/Navbar';
import Form from './pages/Form';
import Post from './pages/Post';
import Update from './pages/Update';
import Result from './pages/Result';



function App() {
 

  return (
    <>
                <Navbar />
                <Toaster 
           position={window.innerWidth < 768 ? 'bottom-center' : 'bottom-right'}
          toastOptions={{duration: 5000}} />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/favourite' element={<Favourite/>}/>
            <Route path='/pet/:id' element={<Pet/>}/>
            <Route path='/forms' element={<Form/>}/>
            <Route path='/post' element={<Post/>}/>
            <Route path='/edit/:id' element={<Update/>}/>
            <Route path='/results' element={<Result/>}/>
          </Routes>
    </>
  )
}

export default App
