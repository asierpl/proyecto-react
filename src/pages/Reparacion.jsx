import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { Header } from '../components/Header/Header'

export const Reparacion = () => {

    const navigate = useNavigate()

    useEffect( () => {

        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])



    return (
        <>
           <Header/>
        </>
    )
}