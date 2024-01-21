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
        fetch( `${VITE_URL_API}/gestor` )
        .then( res => res.json() ) 
        .then( data => { console.log("Data" , data) ,
         setDatos(data)} )
        .catch( error => console.log(error) )
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
    const lefttHandler = () => {
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
                    key={eachImg.id}
                    {...eachImg} />)}
            </div>
            
            {/* Botones para el desplazamiento a la derecha e izquierda, respectivamente, y sus iconos */}
            <button className="Boton-right" onClick={rightHandler}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
            </button>
            <button className="Boton-left"  onClick={lefttHandler}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
            </button>
        </div>
        
        </>
    )
}

//Componente de cada imagen utilizado para el mapeo.
const Photos = (props) => {
    const {src , alt } = props

    return(
        <>
        <img src={src} 
        alt={alt} 
        className={`Photos`} />
        </>
    )
}