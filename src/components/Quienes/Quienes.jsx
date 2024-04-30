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

        let controller = new AbortController()
       
        let options = {
            method  : 'get' , 
            signal : controller.signal,
        }
        fetch(`${VITE_URL_API}/quienes-somos` , options)
            .then( res => res.json() )
            .then( data => setQuienes(data)) 
            .catch( error => console.log( error ))
            .finally( () => controller.abort)

    } , [] )

    //Extrae las propiedades específicas de 'quienesTexto' y se deconstruyen
    const { quienesH , quienesP , valoresH , valoresP , srcEquipo , altEquipo } = quienes.quienesTexto
    
    //Define el estado del lighbox creado para las imagenes del componente y su gestión.
    const[ lightbox , setLightbox] = useState('')

    //Función para actualizar el estado del lighbox
    const lightboxHandler = (valor) => setLightbox(valor)

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
                        <QuienesImagenes key={persona.src} {...persona} lightboxHandler={lightboxHandler}/>)}
                    </ul>
                </div>
               {/* Parte de la sección para ejecutar el lightbox y poder superponer las imagenes al hacer click */}
                <div className={`Lightbox ${lightbox ? 'isVisible' : ''}`}>
                    <button className="Lightbox-btn"
                        onClick={() => lightboxHandler('')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                    </button>
                    <img src={lightbox} alt="Imagen grande" className="Lightbox-img" loading="lazy" />
                </div>      

                {/* Parte de la sección sobre los valores de la empresa */}
                <div className="Valores">
                    <div className="EquipoImg-div">
                        <img src={srcEquipo} alt={altEquipo} className="Equipo-img" loading="lazy" />
                    </div>
                    <div className="Valores-div">
                        <h3 className="Valores-h3">{valoresH}</h3>
                        <p className="Valores-p">{valoresP}</p>
                        <ul className="Valores-ul">
                            {/* Método .map para mostrar la lista de valores */}
                            {quienes.quienesValores.map((valor, index) => 
                            <QuienesValores key={index} {...valor}  />)}
                        </ul>
                    </div>
                </div>
           </section>
        </>
    )
}

//Define el componente que muestra las imágenes del personal en una lista
const QuienesImagenes = (props) => {

    //Deconstruimos mediante props
    const {src , alt , lightboxHandler} = props
    return(
        <>
        {/* Muestra una imagen del personal de la lista */}
        <li className="Personal-li">
            <img onClick={() => lightboxHandler(src)} 
            src = {src} alt = {alt}  loading = 'lazy'
            className="Personal-img" />
        </li>
        </>
    )
}

//Define el componente que muestra los valores del personal en una lista
const QuienesValores = (props) => {

    //Deconstruimos mediante props
    const {valor} = props
    const tick = valor.split('')
    
    return(
        <>
        {/* Muestra un valor del personal de la lista */}
        <li className="Valores-li">
            <p className="Valor-p">
                <span className="tick">{tick[0]}</span>{tick.slice(1).join('')}
            </p>
        </li>
        </>
    )
}
