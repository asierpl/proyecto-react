//Este archivo representa la página de productos en la app de React

//Importa el hook useNavigate de react-router-dom para la navegación
import { useNavigate } from 'react-router-dom'

//Importa el hook useEffect para realizar efectos en el componente.
import { useEffect } from "react"

//Importa el componente 'Header', 'Products' y 'Footer'.
import { Header } from '../components/Header/Header'
import { Products } from '../components/Products/Products'
import { Footer } from '../components/Footer/Footer'

//Exporta y define el componente 'Productos'
export const Productos = () => {

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
        {/* Renderiza los componentes 'Header', 'Products' y 'Footer'*/}
           <Header/>
           <Products/>
           <Footer/>
        </>
    )
}