//Este componente representa la sección de inicio de la página.

//Importa los hooks necesarios desde React
import { useEffect, useState } from 'react'

//Importa el archivo de estilos CSS asociados a este componente
import './Inicio.css'

//Exporta el componente Inicio
export const Inicio = () => {

    //Recoge la variable de entorno 'VITE_URL_API' del entorno de importación.
    const { VITE_URL_API } = import.meta.env

    //Hook useState para gestionar el estado de Inicio.
    const [ initial , setInitial ] = useState({inicio : {} , inicioOffer : []})

     //Hook useEffect para realizar acciones al cargar el componente.
     useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch(`${VITE_URL_API}/inicio` , options)
            .then( res => res.json() )
            .then( data =>  
                //actualiza el estado de 'initial' con los datos obtenidos
                setInitial(data)
            )  
            .catch( error => console.log( error ))
            .finally( ()=> controller.abort())

    } , [] )

    //Deconstrucción de las propiedades del objeto 'initial.inicio'
    const { inicio  , subInicio  , srcA  , srcB  , altInicio  , ofrecer  , ofrecerP } = initial.inicio

    //Retorna el contenido JSX del componente
    return(
        <>
        <section className="Inicio">
            <h2 className="Inicio-h2">{inicio}</h2>
            <h3 className="Inicio-h3">{subInicio}</h3>
            <div className="Inicio-div">
                <img src={srcA} alt={altInicio} className="Inicio-imgA" />
                <img src={srcB} alt={altInicio} className="Inicio-imgB" />
            </div>
            <h3 className="Ofrecer-h3">{ofrecer}</h3>
            <p className="Offer-p">{ofrecerP}</p>
            <div className="Ofrecemos-div">
                <ul className="Ofrecemos-ul">
                    {/* Mapea y renderiza los elementos de 'initial.inicioOffer' utilizando el componente 'Ofrecemos' */}
                    {initial.inicioOffer.map( offer => 
                        <Ofrecemos key={offer.id}{...offer} />
                    )}
                </ul>
            </div>
        </section>
        </>
    )
}

//Define el componente Ofrecemos para mostrar las ofertas de la empresa.
const Ofrecemos = (props) => {
    
    const {xlmns, viewBox , d , offer , offerP} = props

    return(
        <>
        <li className="Ofrecemos-li">
            <svg xmlns={xlmns}  viewBox={viewBox} className="Ofrecemos-img"><path d={d} /></svg>
            <h4 className="Ofrecemos-h4">{offer}</h4>
            <p className="Ofrecemos-p">{offerP}</p>
        </li>
        </>
    )
}






