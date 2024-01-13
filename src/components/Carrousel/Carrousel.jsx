import { useState } from 'react'
import './Carrousel.css'
import { proyectoFinal } from '../../bbdd'
const { carrousel } = proyectoFinal
const {} = carrousel

export const Carrousel = () => {

    const [ active , setActive ] = useState(0)

    const rightHandler = () => {
        setActive( active + 1 )

        if ( active >= carrousel.length - 1 ) {
            setActive(0)
        }
    }

    const lefttHandler = () => {
        setActive( active - 1 )

        if ( active <= 0 ) {
            setActive( carrousel.length - 1 )
        }
    }

    return(
        <>
        <div className="Carrousel">
            <div className="Carrousel-container"
                style={{
                    width : `${ carrousel.length * 100 }%`,
                    gridTemplateColumns : `repeat( ${ carrousel.length } , 1fr )`,
                    transform : `translateX( -${ active * (100/carrousel.length) }%)`,
                }}
                >
                {carrousel.map ( eachImg => 
                    <Photos 
                    key={eachImg.id}
                    {...eachImg} />)}
            </div>

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