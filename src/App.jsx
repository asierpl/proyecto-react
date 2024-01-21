//Este archivo contiene el componente principal de la aplicación
//Utiliza React Router para gestionar las rutas
//Utiliza los componentes de las diferentes páginas de la aplicación

//Importaciones necesarias de React Router y estilos CSS
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'

//Importaciones de los componentes de las páginas.
import { Login } from './pages/Login'
import { Gestor } from './pages/Gestor'
import { Productos } from './pages/Productos'
import { Alquiler } from './pages/Alquiler'
import { Reparacion } from './pages/Reparacion'
import { Quienes } from './pages/Quienes'
import { Contacto } from './pages/Contacto'

//Componente principal de la aplicación
function App() {
 
  //Retorna el contenido del componente
  return (
    <BrowserRouter>
    <>
      <Routes>
        {/* Rutas de la app con sus respectivos componentes */}
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

//Exporta el componente principal de la app
export default App
