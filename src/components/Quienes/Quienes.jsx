import { useEffect, useState } from "react"
import './Quienes.css'
const { VITE_URL_API } = import.meta.env

export const QuienesSomos = () => {

    const [ quienes , setQuienes ] = useState({ quienesTexto : {} , quienesValores : [] , personalFotos : [] })

    useEffect (()=> {
        fetch(`${VITE_URL_API}/quienes-somos`)
        .then( res => res.json() )
        .then( data => {console.log("Data:" , data), setQuienes(data)})  
        .catch( error => console.log( error ))
    } , [] )

    const { quienesH , quienesP , valoresH , valoresP , srcEquipo , altEquipo } = quienes.quienesTexto[0] || {}
    


    return (
        <>
           
           <section className="Section-quienes">
                <div className="Quienes-somos">
                    <h2 className="Quienes-h2">{quienesH}</h2>
                    <p className="Quienes-p">{quienesP}</p>
                </div>
                <div className="Personal">
                    <ul className="Personal-ul">
                    {quienes.personalFotos.map(persona => 
                        <QuienesImagenes key={persona.id} {...persona} />)}
                    </ul>
                </div>
                <div className="Valores-div">
                    <img src={srcEquipo} alt={altEquipo} className="Equipo-img" />
                    <h3 className="Valores-h3">{valoresH}</h3>
                    <p className="Valores-p">{valoresP}</p>
                    <ul className="Valores-ul">
                        {quienes.quienesValores.map(valor => 
                        <QuienesValores key={valor.id} {...valor} />)}
                    </ul>
                </div>
           </section>
        </>
    )
}

const QuienesImagenes = (props) => {
    const {src , alt} = props
    return(
        <>
        <li className="Personal-li">
            <img src={src} alt={alt} className="Personal-img" />
        </li>
        </>
    )
}

const QuienesValores = (props) => {
    const {valor} = props
    return(
        <>
        <li className="Valores-li">
            <p className="Valor-p">{valor}</p>
        </li>
        </>
    )
}