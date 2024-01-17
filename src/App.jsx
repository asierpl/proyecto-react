import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Gestor } from './pages/Gestor'
import { Productos } from './pages/Productos'
import { Alquiler } from './pages/Alquiler'
import { Reparacion } from './pages/Reparacion'
import { Quienes } from './pages/Quienes'
import { Contacto } from './pages/Contacto'

function App() {
 

  return (
    <BrowserRouter>
    <>
      <Routes>
        <Route path='/'              element={ <Login/>  }/>
        <Route path='/gestor'        element={ <Gestor/> }/>
        <Route path='/productos'     element={ <Productos/> }/>
        <Route path='/alquiler'      element={ <Alquiler/> }/>
        <Route path='/reparacion'    element={ <Reparacion/> }/>
        <Route path='/quienes-somos' element={ <Quienes/> }/>
        <Route path='/contacto'      element={ <Contacto/> }/>
      </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
