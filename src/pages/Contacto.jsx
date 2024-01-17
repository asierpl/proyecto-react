import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"

export const Contacto = () => {

    const navigate = useNavigate()

    useEffect( () => {

        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])



    return (
        <>
           <h1>hola</h1>
        </>
    )
}