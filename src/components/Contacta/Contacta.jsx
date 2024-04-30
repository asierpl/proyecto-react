//Este componente representa la sección de contacto de la web.

//Importa los hooks necesarios desde React.
import { useEffect, useState } from 'react'

//Importa el archivo de estilos CSS asociado a este componente.
import './Contacta.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

//Exporta el componente Contacta.
export const Contacta = () => {

    //Hook useState para gestionar el estado de contacto.
    const [ contact , setContact ] = useState({contacto : {}})

    //Hook useEffect para realizar acciones al cargar el componente.
    useEffect (()=> {

        let controller = new AbortController()

        let options = {
            method : 'get',
            signal : controller.signal
        }

        fetch(`${VITE_URL_API}/contacto` , options)
            .then( res => res.json() )
            .then( data =>  
            //Actualiza el estado de 'contacto' con los datos obtenidos.
                setContact(data)
            )  
            .catch( error => console.log( error ))
            .finally( ()=> controller.abort())

    } , [] )
 
    //Deconstrucción de las propiedades del objeto 'contact.contacto'.
    const {contacta , esperamos ,srcUbi , altUbi , calle , ciudad , telefono , numeroA , numeroB , correo , emailCanon , emailBonanza } = contact.contacto

    //Retorna el contenido JSX del componente.
    return(
        <>
        <div className="Contacto">
            <h1 className='Contacta-h1'>{contacta}</h1>
            <section className='Contacta-section'>
                <div className="Contacta-container">
                    {/* Sección de la información de teléfono */}
                    <div className="Contacta-tlf">
                        <h2 className='Telefono-h2'>{telefono}</h2>
                        <a href={`tel: ${numeroA}`} className='Telefono-a'>{numeroA}</a>
                        <a href={`tel: ${numeroB}`} className='Telefono-a'>{numeroB}</a>
                    </div>
                    {/* Sección de la información de email */}
                    <div className="Contacta-email">
                        <h2 className='Correo-h2'>{correo}</h2>
                        <a href={`mailto: ${emailCanon}`} className='Correo-a'>{emailCanon}</a>
                        <a href={`mailto: ${emailBonanza}`} className='Correo-a'>{emailBonanza}</a>
                    </div>
                    {/* Sección de la información de dirección */}
                    <div className="Direccion-oficina">
                        <h2 className='Calle-h2'>{esperamos}</h2>
                        <p className='Calle-p'>{calle}</p>
                        <p className='Calle-p'>{ciudad}</p>
                    </div>
                </div>
                {/* Contenedor de la imagen de la oficina */}
                <div className="Oficina-container">
                    <img src={srcUbi} alt={altUbi} className="Imagen-oficina" />
                </div>
            </section>
        </div>
        </>
    )
}