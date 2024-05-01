//Este archivo representaa la página de inicio de sesión de la app en React.

//Importa el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from 'react-router-dom'

//Importa el hook useEffect para realizar efectos en el componente.
import { useEffect} from "react"

//Importa el componente 'Form' que es el formulario de inicio de sesión
import { Form } from '../components/Login/Form'

//Exporta y define el componente 'Login'
export const Login = () => {
    //Utiliza useNavigate para la navegación
    const navigate = useNavigate()
    
    //Utiliza useEffect para realizar acciones al cargar el componente.
    useEffect(()=>{

        //Verifica si hay usuarios almacenados en localStorage y, en tal caso, redirige a la página principal.
        if( localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])
    
    //Retorna el contenido del componente
    return (
        <> 
            {/* Renderiza el componente 'Form' para mostrar el formulario de inicio de sesión */}
            <Form/>
        </>
    )
}






