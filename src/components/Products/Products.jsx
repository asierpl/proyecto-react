import { useEffect, useState } from 'react'
import './Products.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

export const Products = () => {

    const [ datos , setDatos ] = useState({ productos : []})


    useEffect( () => {

        let controller = new AbortController()
       
        let options = {
            method  : 'get' , 
            signal : controller.signal,
        }
        fetch( `${VITE_URL_API}/productos` ,options )
        .then( res => res.json() )
        .then( data => {console.log(data) , setDatos(data)})
        .catch( error => console.log(error))
        .finally( () => controller.abort())
    } , [])

    return(
        <>
         <div className="Productos">
            <ul className="Productos-ul">
                {datos.productos && datos.productos.map( eachProducto =>
                    <Impresoras key={eachProducto.id}{...eachProducto} />
                )}
            </ul>
        </div>
        </>
    )
}

const Impresoras = (props) => {
    const { h2 , p , href , precio , src , alt } = props
    return(
        <>
            <li className="Impresoras-li">
                <div className="Impresoras-texto">
                    <h2 className="Impresoras-h2">{h2}</h2>
                    <p className="Impresoras-p">{p}</p>
                    <a href={href} title={precio} className="Impresoras-a">{precio}</a>
                </div>
               
                    <img src={src} alt={alt} className="Impresoras-img" loading="lazy"/>
                
            </li>
        </>
    )
}