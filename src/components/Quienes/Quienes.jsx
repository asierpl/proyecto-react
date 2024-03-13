//Este archivo representa la pagina de "Quienes somos" de la app de React

//Importa los hooks useState y useEffect para gestionar el estado del componente, sus cambios y efectos.
import { useEffect, useState } from "react"

//Importa el estilo CSS para esta página.
import './Quienes.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

//Exorta y define el componente 'QuienesSomos'
export const QuienesSomos = () => {

    
    //Hook useState para gestionar el estado de quienes
    const [ quienes , setQuienes ] = useState({ quienesTexto : {} , quienesValores : [] , personalFotos : [] })

    //Hook useEffect para realizar acciones al cargar el componente
    useEffect (()=> {
        fetch(`${VITE_URL_API}/quienes-somos`)
        .then( res => res.json() )
        .then( data => setQuienes(data)) 
        .catch( error => console.log( error ))
    } , [] )

    //Extrae las propiedades específicas de 'quienesTexto' y se deconstruyen
    const { quienesH , quienesP , valoresH , valoresP , srcEquipo , altEquipo } = quienes.quienesTexto
    
    

    //Retorna el contenido del componente
    return (
        <>
           {/* Estructura de la sección principal de "Quienes Somos" */}
           <section className="Section-quienes">
                {/*  Parte de la sección como texto introductorio de la empresa sobre "Quienes Somos" */}
                <div className="Quienes-somos">
                    <h2 className="Quienes-h2">{quienesH}</h2>
                    <p className="Quienes-p">{quienesP}</p>
                </div>
                {/* Parte de la sección sobre fotos del personal que trabaja en la empresa */}
                <div className="Personal">
                    <ul className="Personal-ul">
                    {/* Método .map para mostrar la lista de fotos */}
                    {quienes.personalFotos.map(persona => 
                        <QuienesImagenes key={persona.id} {...persona} />)}
                    </ul>
                </div>
                {/* Parte de la sección sobre los valores de la empresa */}
                <div className="Valores-div">
                    <img src={srcEquipo} alt={altEquipo} className="Equipo-img" />
                    <h3 className="Valores-h3">{valoresH}</h3>
                    <p className="Valores-p">{valoresP}</p>
                    <ul className="Valores-ul">
                        {/* Método .map para mostrar la lista de valores */}
                        {quienes.quienesValores.map(valor => 
                        <QuienesValores key={valor.id} {...valor} />)}
                    </ul>
                </div>
           </section>
        </>
    )
}

//Define el componente que muestra las imágenes del personal en una lista
const QuienesImagenes = (props) => {

    //Deconstruimos mediante props
    const {src , alt} = props
    return(
        <>
        {/* Muestra una imagen del personal de la lista */}
        <li className="Personal-li">
            <img src={src} alt={alt} className="Personal-img" />
        </li>
        </>
    )
}

//Define el componente que muestra los valores del personal en una lista
const QuienesValores = (props) => {

    //Deconstruimos mediante props
    const {valor} = props
    
    return(
        <>
        {/* Muestra un valor del personal de la lista */}
        <li className="Valores-li">
            <p className="Valor-p">{valor}</p>
        </li>
        </>
    )
}