//Este archivo representa la página de quiénes somos en la app de React

//Importa el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from 'react-router-dom'

//Importa el hook useEffect para realizar efectos en el componente.
import { useEffect } from "react"

//Importa el componente 'Header' desde el directorio '../components/Header/Header'
import { Header } from '../components/Header/Header'

//Importa el componente 'Header' desde el directorio '../components/Quienes/Quienes'
import { QuienesSomos } from '../components/Quienes/Quienes'
import { Footer } from '../components/Footer/Footer'

//Exporta y define el componente 'Quienes'
export const Quienes = () => {

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
        {/* Renderiza el componente 'Header' para mostrar la cabecera común a los demás endpoints*/}
           <Header/>
           {/* Renderiza el componente 'Header' la información particular de este endpoint*/}
           <QuienesSomos/>
           <Footer/>
        </>
    )
}