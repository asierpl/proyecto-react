//Este archivo contiene el componente principal de la aplicación
//Utiliza React Router para gestionar las rutas
//Utiliza los componentes de las diferentes páginas de la aplicación

//Importaciones necesarias de React Router y estilos CSS
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'

//Importaciones de los componentes de las páginas.
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Productos } from './pages/Productos'
import { Mantenimiento } from './pages/Mantenimiento'
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
        <Route path='/'              element={ <Login/>         }/>
        <Route path='/inicio'        element={ <Home/>          }/>
        <Route path='/productos'     element={ <Productos/>     }/>
        <Route path='/mantenimiento' element={ <Mantenimiento/> }/>
        <Route path='/quienes-somos' element={ <Quienes/>       }/>
        <Route path='/contacto'      element={ <Contacto/>      }/>
      </Routes>
    </>
    </BrowserRouter>
  )
}

//Exporta el componente principal de la app
export default App
