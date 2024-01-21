//Este archivo contiene el componente Header, que representa la cabecera común para todos los endpoints

//Importa los hooks useState y useEffect para gestionar el estado del componente, sus cambios y efectos.
import { useEffect, useState } from 'react'

//Importa el estilo CSS para esta página.
import './Header.css'

//Importa NavLink para la navegación entre los diferentes endpoints del menú de navegación
import { NavLink } from 'react-router-dom'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

//Exorta y define el componente de la cabecera 'Header'.
export const Header = () => {
    
    //Estado del componente para almacenar los datos del header
    const [ datos , setDatos ] = useState({ headerLogo : {} , headerNav : [] })

    //Obtiene los datos del header desde la API al cargar el componente.
    useEffect (()=> {
        fetch(`${VITE_URL_API}/gestor`)
        .then( res => res.json() )
        .then( data => {console.log("Data:" , data), setDatos(data)})  
        .catch( error => console.log( error ))
    } , [] )

    //Extrae las propiedades específicas de 'headerLogo' y se deconstruyen
    const { bonanza , partner , canonAlt , canonSrc } = datos.headerLogo     //DUDA: ¿Por que aqui no necesito '[0] || {}' para que se vea y en los otros archivos si?
    
    //Retorna el contenido del componente
    return (
        <>
         {/* Estructura de la cabecera */}
        <div className="Header">
           
            <div className="Header-logo">
            <>
                {/* Logo de la empresa */}
                <div className="Bonanza">
                    <img src={bonanza} alt="Imagen" className="Img-bonanza" />
                </div>

                {/* Logo de la marca */}
                <div className="Canon">
                    <h1 className="Partner">{partner}</h1>
                    <img src={canonSrc} alt={canonAlt} className="Canon-img" />
                </div>
            </>        
            </div>

            {/* Estructura del menú de navegación, usando .map para lanzar toda la lista */}
            <nav className="Header-nav">
                <ul className="HeaderNav-ul">
                    {datos.headerNav.map (eachLi =>
                        <HeaderNav key={eachLi.id} {...eachLi} /> 
                    )}
                </ul>
            </nav>


        </div>
        </>
    )
}

//Componente del menú de navegación de la cabecera
const HeaderNav = (props) => {

    const { title, href } = props

    return(
        <>  
            {/* Estructura de cada elemento de la lista de navegación */}
            <li className="HeaderNav-li">
                <NavLink to={href} className="HeaderNav-a">{title}</NavLink>
            </li>
        </>
    )
}
