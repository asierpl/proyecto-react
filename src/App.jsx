import {BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import { Login } from './pages/Login'
import { Gestor } from './pages/Gestor'

function App() {
 

  return (
    <BrowserRouter>
    <>
      <h1>Proyecto final</h1>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/gestor' element={<Gestor/>}/>
      </Routes>
    </>
    </BrowserRouter>
  )
}

export default App
