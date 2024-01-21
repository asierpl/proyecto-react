

import { useNavigate } from 'react-router-dom'
import { createContext, useContext, useEffect, useRef, useState} from "react"
import { Header } from '../components/Header/Header'
import { Carrousel } from '../components/Carrousel/Carrousel'
import './Gestor.css'


const { VITE_URL_API } = import.meta.env

const GestorContext = createContext()

export const Gestor = () => {

    const navigate = useNavigate()

    const [ datos , setDatos ] = useState({ listaGestor: [] , añadirGestor : {} , actualizarGestor : {}})

   
    

    const formAddRef = useRef()
    const formPutRef = useRef()


    useEffect( () => {

        if( !localStorage.getItem('usuarios') ) {
            navigate('/')
        }
    } , [])


    let fetchHandler = async ( method , body ) => {
        let url = method === 'delete'
        ?`${ VITE_URL_API }/gestor/${body.id}`
        :`${ VITE_URL_API }/gestor`

        let controller = new AbortController()

        let options = {
            method ,
            headers : {"Content-type" : "application/json"},
            signal  : controller.signal
        }

        if( method === 'put' || method === 'post'){
            options.body = JSON.stringify(body)
        }

        await fetch( url , options )
        .then( res    => res.json() )
        .then( data   =>  setDatos(data) )
        .catch( error => console.log (error))
        .finally(()   => controller.abort)
    }

    useEffect(()=> {

        fetchHandler('get')

    } , [])


    const formAddHandler = (e) => {
        e.preventDefault()

        const {solicitud , comment } = formAddRef.current
        
        let nuevo = {
            solicitud : solicitud.value,
            comment : comment.value
        }

        fetchHandler( 'post' , nuevo )

        formAddRef.current.reset()

        
    }


    
    const deleteHandler = (id) => {
        if (id) {
            fetchHandler('delete' , {id})
        } else { 
            console.log('id indefinido')
        }
        
    }




     const updateHandler = (id) => {
        const buscar = datos.listaGestor.find( gestion => gestion.id == id )
        
        const { idInput , solicitudInput , commentInput } = formPutRef.current
        idInput.value     = buscar.id
        solicitudInput.value = buscar.solicitud
        commentInput.value   = buscar.comment
    }

    const formPutHandler = (e) => {
        e.preventDefault()

        const {idInput , solicitudInput , commentInput} = formPutRef.current

        const nuevosDatos = {
            id     : idInput.value,
            solicitud : solicitudInput.value,
            comment   : commentInput.value
        }

        fetchHandler('put' , nuevosDatos)
    }

  

    return (
        <>


<GestorContext.Provider value = {{datos, formAddRef  ,  formPutRef, formAddHandler , deleteHandler , formPutHandler , updateHandler }}>
            <>
                <Header/>
                <Carrousel/>
                <ListaGestor/>
                <AñadirGestor/>
                <ActualizarGestor />
            </>
       </GestorContext.Provider>
          
        </>
    )
}

const ListaGestor = () => {
    const {datos}= useContext(GestorContext)
    return (
        <>
        
            <h2 className="Solicitudes-h2">Tus solicitudes pendientes para asistencia técnica</h2>
            <div className="Solicitudes-lista">
            <ul>
                { datos.listaGestor.length === 0
                    ? <li>No hay gestor</li>
                    : datos.listaGestor.map ( gestion =>
                        <GestorInicial 
                        key={ gestion._id } {...gestion} id={gestion._id} />
                    ) 
                }
            </ul>
        </div>
        </>
    )
}
const GestorInicial = ( {solicitud , comment , _id} ) => {
    const {updateHandler , deleteHandler} = useContext(GestorContext)
    return(
        <>
        
        <li>
            <div className="Container">
                <div className="Container-solicitud">
                    <h3 className="Solicitudes-h3">Solicitud</h3>
                    <span>{ solicitud }</span>
                </div>
                <div className="Container-comment">
                    <h4 className="Solicitudes-h4">Comentarios</h4>
                    <span>{ comment }</span>
                </div>
            
                <div className="Put-delete">
                    <button className="Btn-update" onClick={()=>updateHandler(_id)} >Actualizar</button>
                    <button className="Btn-delete" onClick={()=>deleteHandler(_id)}>Eliminar</button>
                </div>
            </div>
        </li> 
        
        </>
    )
}


const AñadirGestor = () => {
    const solicitud = useRef('')
    const comment = useRef('')
    const {formAddRef , formAddHandler , datos } = useContext(GestorContext)
    const {h2Add ,  typeAdd ,  idAddS ,  idAddC , placeholderAddS , placeholderAddC, typeSubmit , valueAdd} =( datos.añadirGestor)[0] || {valueAdd : ''}
    return (
        <>
         <h2 className="Añadir-h2">{h2Add}</h2>
        <div className="Añadir-container">
            <form ref={formAddRef} onSubmit={formAddHandler}>
                <input type={typeAdd} id={idAddS}   placeholder={placeholderAddS} ref={solicitud} />
                <input type={typeAdd} id={idAddC} placeholder={placeholderAddC} ref={comment} />
                <input type={typeSubmit} value={valueAdd} />
            </form>
        </div>
        </>
    )

}


const ActualizarGestor = () => {
    const { formPutHandler , formPutRef, datos} = useContext(GestorContext)
    const { typeUp ,  idInput  , idUpS ,  idUpC , placeholderUpId  , placeholderUpS , placeholderUpC, typeUpdate , valueUpdate} = datos.actualizarGestor[0] || {valueUpdate : ''}
    return (
        <>
         <h2 className="Actualizar-h2">Actualiza tu solicitud</h2>
         <div className="Actualizar-container">
            <form ref={formPutRef} onSubmit={formPutHandler}>
                <input type={typeUp} id={idInput}     placeholder={placeholderUpId} />
                <input type={typeUp} id={idUpS}   placeholder={placeholderUpS} />
                <input type={typeUp} id={idUpC} placeholder={placeholderUpC} />
                <input type={typeUpdate} value={valueUpdate} />
            </form>
        </div>
        </>
    )
}
