//Este componente representa la sección de productos de la aplicación.

//Importa los hooks necesarios.
import { useEffect, useState } from 'react'

//Importa los estilos CSS asociados a este componente.
import './Products.css'

//Importa NavLink para la navegación al endpoint /contacto.
import { NavLink } from 'react-router-dom'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación.
const { VITE_URL_API } = import.meta.env

//Exporta el componente Products.
export const Products = () => {

    //Define el estado inicial del componente usando el hook useState.
    const [ datos , setDatos ] = useState({ productos : []})

    //Obtiene los datos de los productos desde la API al cargar el componente.
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

    //Retorna el contenido JSX del componente.
    return(
        <>
         <div className="Productos">
            {/* Lista de todos los productos */}
            <ul className="Productos-ul">
                {datos.productos && datos.productos.map( eachProducto =>
                    <Impresoras key={eachProducto.id}{...eachProducto} />
                )}
            </ul>
        </div>
        </>
    )
}

//Componente Impresoras para mostrar cada producto.
const Impresoras = (props) => {

    //Deconstruye las propiedades mediante props.
    const { h2 , p , href , precio , src , alt } = props

    //Retorna el contenido JSX para mostrar cada producto.
    return(
        <>
            <li className="Impresoras-li">
                <div className="Impresoras-texto">
                    <h2 className="Impresoras-h2">{h2}</h2>
                    <p className="Impresoras-p">{p}</p>
                    <NavLink to={href} title={precio} className="Impresoras-a">{precio}</NavLink>
                </div>
                <img src={src} alt={alt} className="Impresoras-img" loading="lazy"/>
            </li>
        </>
    )
}

