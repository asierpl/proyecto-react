import './Footer.css'

//Importa NavLink para la navegación entre los diferentes endpoints del menú de navegación
import { NavLink } from 'react-router-dom'


import { useEffect, useState } from 'react'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env


export const Footer = () => {
    const [pie , setPie] = useState({ footer : {} , footerOficina : [] , headerNav : [] })

    const { bonanzaPie , silverPie  , pPie  , infoPie } = pie.footer
    //Obtiene los datos del footer desde la API al cargar el componente.
    useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch(`${VITE_URL_API}/gestor` , options)
        .then( res => res.json() )
        .then( data => setPie(data))  
        .catch( error => console.log( error ))
        .finally( ()=> controller.abort())
   } , [] )
   

    return(
        <>
        
        <footer className="Footer">
            <div className="Footer-container">
                <div className="Footer-div">
                    <img src="/assets/logobonanza.jpg" alt="Logo Bonanza" className="Footer-img" />
                    {/* <h4 className="Footer-h4">{bonanzaPie}</h4> */}
                    <h5 className="Footer-h5">{silverPie}</h5>
                    <p className="Footer-p">{pPie}</p>
                </div>
                <div className="Info-div">
                    <h4 className="Info-h4">{infoPie}</h4>
                <ul className="Info-ul">
                        {pie.headerNav.map (eachLi =>
                            <FooterNav key={eachLi.id} {...eachLi} /> 
                        )}
                    </ul>
                </div>
                <div className="Oficina-div">
                    <ul className="Oficina-ul">
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