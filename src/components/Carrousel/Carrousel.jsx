//Este archivo contiene el componente que representa un carrousel de imágenes.

//Importa los hooks useState y useEffect para gestionar el estado del componente, sus cambios y efectos.
import { useEffect, useState } from 'react'

//Importa el estilo CSS para esta página.
import './Carrousel.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

//Exorta y define el componente de la cabecera 'Carrousel'.
export const Carrousel = () => {

    //Estado del componente para almacenar el índice de la imagen activa del carrousel
    const [ active , setActive ] = useState(0)
    
    //Estado del componente para almacenar los datos del carrousel
    const [ datos , setDatos ] = useState({ carrousel : []})

    //Obtiene los datos del carrousel desde la API al cargar el componente
    useEffect( () => {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch( `${VITE_URL_API}/inicio` , options )
        .then( res => res.json() ) 
        .then( data => setDatos(data) )
        .catch( error => console.log(error) )
        .finally( ()=> controller.abort() )

    }, [] )

    //Función para gestionar el desplazamiento hacia la derecha del carrousel
    const rightHandler = () => {
        setActive( active + 1 )

        //Reinicia el índice al llegar al final
        if ( active >= datos.carrousel.length - 1 ) {
            setActive(0)
        }
    }

    //Función para gestionar el desplazamiento hacia la izquierda del carrousel
    const leftHandler = () => {
        setActive( active - 1 )

        //Muestra la última foto al llegar al principio del carrousel
        if ( active <= 0 ) {
            setActive( datos.carrousel.length - 1 )
        }
    }

    //Retorna el contenido del componente
    return(
        <>
        {/* Estructura del carrousel */}

       { datos.carrousel &&
       
       <div className="Carrousel">
            <div className="Carrousel-container"

                // Estilos inline para adaptar el carrousel a cualquier número de fotos
                style={{
                    width : `${ datos.carrousel.length * 100 }%`,
                    gridTemplateColumns : `repeat( ${ datos.carrousel.length } , 1fr )`,
                    transform : `translateX( -${ active * (100/datos.carrousel.length) }%)`,
                }}
            >
                {/* Método .map para lanzar todas las imágenes */}
                {datos.carrousel.map ( eachImg => 
                    <Photos 
                    key={eachImg.src}
                    {...eachImg} />)}
            </div>
            
            {/* Botones para el desplazamiento a la derecha e izquierda, respectivamente, y sus iconos */}
            <button className="Boton-right" onClick={rightHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
            <button className="Boton-left"  onClick={leftHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                </svg>
            </button>
        </div>

        }
        
        </>
    )
}

//Componente de cada imagen utilizado para el mapeo.
const Photos = (props) => {
    const {src , alt } = props

    return(
        <>
        <img src={src} alt={alt} className={`Photos`} loading="lazy" />
        </>
    )
}

