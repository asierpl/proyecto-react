import { useNavigate } from 'react-router-dom'
import { useEffect} from "react"
import { Header } from '../components/Header/Header'
import { QuienesSomos } from '../components/Quienes/Quienes'

export const Quienes = () => {

    const navigate = useNavigate()

    useEffect( () => {

        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])

    return (
        <>
           <Header/>
           <QuienesSomos/>
        </>
    )
}

