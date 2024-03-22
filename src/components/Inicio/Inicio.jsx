import { useEffect, useState } from 'react'
import './Inicio.css'

export const Inicio = () => {

    //Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
    const { VITE_URL_API } = import.meta.env

    //Hook useState para gestionar el estado de inicio
    const [ initial , setInitial ] = useState({inicio : {} , inicioOffer : []})

     //Hook useEffect para realizar acciones al cargar el componente
     useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch(`${VITE_URL_API}/gestor` , options)
        .then( res => res.json() )
        .then( data =>  
        //actualiza el estado de 'inicio' con los datos obtenidos
        setInitial(data))  
        .catch( error => console.log( error ))
        .finally( ()=> controller.abort())
    } , [] )

    const {inicio  , subInicio  , srcA  , srcB  , altInicio  , ofrecer  , ofrecerP  } = initial.inicio

    return(
        <>
        <section className="Inicio">
       
            <h2 className="Inicio-h2">{inicio}</h2>
            <h3 className="Inicio-h3">{subInicio}</h3>
            <div className="Inicio-div">
                <img src={srcA} alt={altInicio} className="Inicio-img" />
                <img src={srcB} alt={altInicio} className="Inicio-img" />
            </div>
            <h3 className="Ofrecer-h3">{ofrecer}</h3>
            <p className="Offer-p">{ofrecerP}</p>
            <div className="Ofrecemos-div">
                <ul className="Ofrecemos-ul">
                    {initial.inicioOffer.map( offer => 
                        <Ofrecemos key={offer.id}{...offer} />
                    )}
                </ul>
            </div>
        </section>
        </>
    )
}




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






