

import { useEffect, useState } from 'react'
import './Contacta.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

export const Contacta = () => {

    //Hook useState para gestionar el estado de contacto
    const [ contact , setContact ] = useState({contacto : {}})

    //Hook useEffect para realizar acciones al cargar el componente
    useEffect (()=> {
        fetch(`${VITE_URL_API}/contacto`)
        .then( res => res.json() )
        .then( data =>  
        //actualiza el estado de 'contacto' con los datos obtenidos
            setContact(data))  
        .catch( error => console.log( error ))
    } , [] )
 
    
    const {contacta , esperamos , calle , ciudad , telefono , numero , correo , emailCanon , emailBonanza } = contact.contacto[0] || {}

    return(
        <>

        
        <h1 className='Contacta-h1'>{contacta}</h1>
        <section className='Contacta-section'>
            <h2 className='Calle-h2'>{esperamos}</h2>
            <p className='Calle-p'>{calle}</p>
            <p className='Calle-p'>{ciudad}</p>

            <h2 className='Telefono-h2'>{telefono}</h2>
            <p className='Telefono-p'>{numero}</p>

            <h2 className='Correo-h2'>{correo}</h2>
            <a className='Correo-a'>{emailCanon}</a>
            <a className='Correo-a'>{emailBonanza}</a>
        </section>
        
        </>
    )
}