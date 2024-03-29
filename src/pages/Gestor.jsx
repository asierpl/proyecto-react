import { useNavigate } from 'react-router-dom'
import { useEffect} from "react"
import { Header } from '../components/Header/Header'
import { Carrousel } from '../components/Carrousel/Carrousel'

import { Inicio } from '../components/Inicio/Inicio'
import { Footer } from '../components/Footer/Footer'

export const Gestor = () => {

    const navigate = useNavigate()

    useEffect( () => {

        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])

    return (
        <>
        <Header/>
        <Carrousel/>
        <Inicio/>
        <Footer/>
        </>
    )
}

