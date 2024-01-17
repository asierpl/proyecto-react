import { useEffect, useState } from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

const { VITE_URL_API } = import.meta.env



export const Header = () => {
    
    const [ datos , setDatos ] = useState({ headerLogo : {} , headerNav : [] })

    useEffect (()=> {
        fetch(`${VITE_URL_API}/gestor`)
        .then( res => res.json() )
        .then( data => {console.log("Data:" , data), setDatos(data)})  
        .catch( error => console.log( error ))
    } , [] )

    const { bonanza , partner , canonAlt , canonSrc } = datos.headerLogo
    
    return (
        <>
        <div className="Header">

            <div className="Header-logo">
            
                <>
                <div className="Bonanza">
                    <img src={bonanza} alt="Imagen" className="Img-bonanza" />
                    {/* <h1 className="Bonanza-h1">{bonanza}</h1> */}
                </div>
                <div className="Canon">
                    <h2 className="Partner">{partner}</h2>
                    <img src={canonSrc} alt={canonAlt} className="Canon-img" />
                </div>
                </>
                
            </div>

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

const HeaderNav = (props) => {

    const { title, href } = props

    return(
        <>
            <li className="HeaderNav-li">
                <NavLink to='/productos' className="HeaderNav-a">{title}</NavLink>
            </li>
        </>
    )
}
