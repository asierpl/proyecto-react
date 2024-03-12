import { useEffect, useState } from 'react'
import './Reparaciones.css'


//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env


export const Reparaciones = () => {

    const [ datos , setDatos ] = useState({ reparacion : []})

    useEffect( () => {
        fetch( `${VITE_URL_API}/reparacion` )
        .then( res => res.json() )
        .then( data => {console.log(data) , setDatos(data)})
        .catch( error => console.log(error))
    } , [])


    return(
        <>
        <h2>Hola</h2>
        <div className="Reparacion">
            <ul className="Reparacion-ul">
                {datos.reparacion && datos.reparacion.map( reparar =>
                    <Repair key={reparar.id}{...reparar} />
                )}
            </ul>
        </div>

        </>
    )
}


const Repair = (props) => {
    const {  problema , comentarios } = props
    return(
        <>
            <li className="Repair-li">
                <h2 className="Repair-h2">{problema}</h2>
                <p>{comentarios}</p>
               
            </li>
        </>
    )
}