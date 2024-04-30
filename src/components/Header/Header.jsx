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

    const [ active , setActive ] = useState(false)
    const menuToggle = () => setActive(!active)

    //Obtiene los datos del header desde la API al cargar el componente.
    useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }
        fetch(`${VITE_URL_API}/inicio` , options)
            .then( res => res.json() )
            .then( data => setDatos(data))  
            .catch( error => console.log( error ))
            .finally( ()=> controller.abort())

    } , [] )

    //Extrae las propiedades específicas de 'headerLogo' y se deconstruyen
    const { bonanza ,  canonAlt , canonSrc } = datos.headerLogo     
    
    //Retorna el contenido del componente.
    return (
        <>
        {/* Estructura de la cabecera */}
        <div className="Header-container">
            <div className="Header">
                <div className="Header-logo">
                    {/* Logo de la empresa */}
                    <div className="Bonanza">
                        <NavLink to='/inicio' title='Inicio' className="Impresoras-logo">
                            <img src={bonanza} alt="Imagen" className="Img-bonanza" />
                        </NavLink>   
                    </div>
                    {/* Logo de la marca */}
                    <div className="Canon">
                        {/* <h1 className="Partner">{partner}</h1> */}
                        <a title="Canon" href="https://www.canon.es/" target='_blank'>
                            <img src={canonSrc} alt={canonAlt} className="Canon-img" />
                        </a>
                    </div>
                    <button onClick={menuToggle} className="Menu-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
                {/* Estructura del menú de navegación, usando .map para lanzar toda la lista */}
                <nav className={`Header-nav ${active ? 'isVisible' : ''}`}>
                    {active && 
                        <button onClick={menuToggle} className="Cerrar-menu">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button> }
                    <ul className="HeaderNav-ul">
                        {datos.headerNav.map (eachLi =>
                            <HeaderNav key={eachLi.title} {...eachLi} /> 
                        )}
                    </ul>
                </nav>
            </div>
            <hr className="LineaH" />
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
