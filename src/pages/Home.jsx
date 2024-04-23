//Este archivo representa la página de inicio en la app de React

//Importa el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from 'react-router-dom'

//Importa el hook useEffect para realizar efectos en el componente.
import { useEffect} from "react"

//Importa los componentes 'Header', 'Contacta', 'Inicio y 'Footer' 
import { Header } from '../components/Header/Header'
import { Carrousel } from '../components/Carrousel/Carrousel'
import { Inicio } from '../components/Inicio/Inicio'
import { Footer } from '../components/Footer/Footer'

//Exporta y define el componente 'Home'
export const Home = () => {

    //Utiliza useNavigate para la navegación
    const navigate = useNavigate()

    //Utiliza useEffect para realizar acciones al cargar el componente.
    useEffect( () => {

        //Verifica si no hay usuarios almacenados en localStorage y, en tal caso, redirige a la página de inicio de sesión.
        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])

    //Retorna el contenido del componente
    return (
        <>
            {/* Renderiza los componentes 'Header', 'Carrousel', 'Inicio' y 'Footer' */}
            <Header/>
            <Carrousel/>
            <Inicio/>
            <Footer/>
        </>
    )
}

