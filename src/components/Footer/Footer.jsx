//Este componente representa el pie de página de la aplicación.

//Importa los estilos CSS asociados al pie de página.
import './Footer.css'

//Importa NavLink para la navegación entre los diferentes endpoints del menú de navegación del pie de página.
import { NavLink } from 'react-router-dom'

//Importa los hooks necesarios desde React.
import { useEffect, useState } from 'react'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación.
const { VITE_URL_API } = import.meta.env

//Exporta el componente Footer.
export const Footer = () => {

    //Define el estado inicial del componente con el hook useState.
    const [pie , setPie] = useState({ footer : {} , footerOficina : [] , footerNav : [] })

    //Deconstruye las propiedades del objeto 'pie.footer'.
    const { silverPie , pPie } = pie.footer

    //Obtiene los datos del footer desde la API al cargar el componente.
    useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch(`${VITE_URL_API}/inicio` , options)
            .then( res => res.json() )
            .then( data => setPie(data))  
            .catch( error => console.log( error ))
            .finally( ()=> controller.abort())
   } , [] )
   
    //Retorna el contenido JSX del componente.
    return(
        <>
        <footer className="Footer">
            <div className="Footer-container">
                <div className="Footer-div">
                    <img src="/assets/logo-bonanza.png" alt="Logo Bonanza" className="Footer-img" />
                    <h5 className="Footer-h5">{silverPie}</h5>
                    <p className="Footer-p">{pPie}</p>
                </div>
                <div className="Info-div">
                    <ul className="Info-ul">
                        {/* Mapea y renderiza los elementos de 'pie.footerNav' utilizando el componente 'FooterNav' */}
                        {pie.footerNav.map (eachLi =>
                            <FooterNav key={eachLi.id} {...eachLi} /> 
                        )}
                    </ul>
                </div>
                <div className="Oficina-div">
                    <ul className="Oficina-ul">
                         {/* Mapea y renderiza los elementos de 'pie.footerOficina' utilizando el componente 'Oficina' */}
                        {pie.footerOficina.map( oficina => 
                            <Oficina key={oficina.id}{...oficina} />
                        )}
                    </ul>
                </div>
            </div>
        </footer>
        </>
    )
}

//Componente del menú de navegación del pie de página.
const FooterNav = (props) => {

    const { title, href } = props

    return(
        <>  
            {/* Estructura de cada elemento de la lista de navegación */}
            <li className="FooterNav-li">
                <NavLink to={href} className="FooterNav-a">{title}</NavLink>
            </li>
        </>
    )
}

//Componente de información de la oficina del pie de página.
const Oficina = (props) => {

    const { pA , pB , pC } = props

    return(
        <>
            <li className="Oficina-li">
                <p className="Oficina-p">{pA}</p>
                <p className="Oficina-p">{pB}</p>
                <p className="Oficina-p">{pC}</p>
            </li>
        </>
    )
}