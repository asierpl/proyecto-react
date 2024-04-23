import { createContext, useContext, useEffect, useRef, useState } from 'react'
import './Toner.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

const TonerContext  = createContext()

export const Toner = () => {

   
    const colorRef      = useRef()
    const comentarioRef = useRef()

    const updateRef = useRef()

    // const formUpdateRef = useRef()

    const [ datos , setDatos ] = useState({ toner : [] })

    // const {tonerh , tonerp} = datos.infoToner

    useEffect( () => {

        let controller = new AbortController()
       
        let options = {
            method  : 'get' , 
            signal : controller.signal,
        }
        fetch( `${VITE_URL_API}/mantenimiento` , options )
        .then( res => res.json() )
        .then( data => {console.log(data) , setDatos(data)})
        .catch( error => console.log(error))
        .finally( () => controller.abort())
    } , [])
 
    const addTonerHandler = async (e) => {
        e.preventDefault()

        // const { color , comentario } = formAddRef.current.value

        
        let nuevoToner = { 
            color : colorRef.current.value,
            comentario   : comentarioRef.current.value
        }

        let options = {
            method : 'post',
            headers : { "Content-type" : "application/json"},
            body : JSON.stringify(nuevoToner)
        }

        
        try {
            await fetch(`${VITE_URL_API}/mantenimiento` , options)
            
            setDatos(eachData => ({
                ...eachData, toner : [...eachData.toner , nuevoToner]}))

        } catch (error) {
            console.log(error)
        }
    }

    const deleteTonerHandler = async (id) => {
        let options = {
            method : 'delete',
            headers : { "Content-type" : "application/json"}
        }

        try {
            await fetch(`${VITE_URL_API}/mantenimiento/${id}` , options)

            const res = await fetch(`${VITE_URL_API}/mantenimiento`)
            const tonerData = await res.json()

            setDatos(tonerData && tonerData.toner 
                ? {toner : tonerData.toner}
                : { toner : []} )

        } catch (error) {
            console.log(error)
        }
    }

    const [ editar , setEditar ] = useState(false)
    const toggleEditar = () => { setEditar(!editar) }

    const updateTonerHandler = (id) => {
        const buscar = datos.toner.find( toner => toner._id === id )

        const {updateId , updateColor , updateComentario} = updateRef.current

        updateId.value = buscar._id
        updateColor.value = buscar.color
        updateComentario.value = buscar.comentario
        
        toggleEditar()
    }

    const editarFormTonerHandler =  async (e) => {
        e.preventDefault()

        const {updateId , updateColor , updateComentario} = updateRef.current

        const tonerEditado = {
            
            color : updateColor.value,
            comentario : updateComentario.value
        }


        let options = {
            method : 'put',
            headers : { "Content-type" : "application/json"},
            body : JSON.stringify(tonerEditado)
        }

        try {
            const res = await fetch(`${VITE_URL_API}/mantenimiento/${updateId.value}` , options)
            const nuevoToner = await res.json()

           
            setDatos({toner : nuevoToner})

            // setDatos(eachData => ({
            //     ...eachData, toner : [...eachData.toner , nuevoToner]}))

        } catch (error) {
            console.log(error)
        }

        updateRef.current.reset()
        toggleEditar()
    }

    
    return(

        <TonerContext.Provider value={{ deleteTonerHandler , updateTonerHandler , addTonerHandler , colorRef , comentarioRef , updateRef , editarFormTonerHandler}}>
        <>
        <div className="Toner-info">
            <h2 className="Toner-h2">Servicio de mantenimiento</h2>
            <p className="Toner-p">Aquí podrás encontrar tus solicitudes pendientes de recambios de tóner, así como hacer nuevos pedidos y también editar o eliminar los ya existentes.</p>
        </div>
        <div className="Mantenimiento">
            <div className="Formularios-div">
                <AddToner/>
                <EditarToner/>
            </div>
            <div className="Solicitud-comentario">
                <h2 className="Solicitud-h2">Solicitud</h2>
                <h2 className="Comentarios-h2">Comentarios</h2>
                <h2 className="Boton-h2"></h2>
            </div>
                <div className="SolicitudToner-container">
                    <ul className="SolicitudToner-ul">
                        {datos.toner === 0
                        
                            ? <li>Nada</li>

                            : (datos.toner && datos.toner.map( eachToner => 
                                <ListaToner key={eachToner.id} {...eachToner}/>
                            ))
                        }
                    </ul>
                </div>
            
            
            

        </div>
        </>
        </TonerContext.Provider>
    )
}



const ListaToner = (props) => {
    const {color , comentario ,  _id  } = props
    const {deleteTonerHandler , updateTonerHandler} = useContext(TonerContext)
    
    

    return(
        <>
        <li className="SolicitudToner-li">
            <div className="ColorToner-div">
                
                <h3 className="ColorToner-h3">{color}</h3>
            </div>
            <div className="ComentarioToner-div">
                
                <h3 className="ComentarioToner-h3">{comentario}</h3>
                
            </div>
            <div className="Botones-toner">
                <button onClick={()=> updateTonerHandler(_id)} className="Toner-update">Editar</button>
                <button onClick={()=> deleteTonerHandler(_id)} className="Toner-delete">Eliminar</button>
            </div>
        </li>
        </>
    )
}

 const AddToner = () => {

    const { addTonerHandler , colorRef , comentarioRef } = useContext(TonerContext)

    return(
        <>
        <div className="Add-container">
        <h2 className="AddToner-h2">Añadir</h2>
        <div className="AddToner-div">
            <form onSubmit={addTonerHandler}  className="AddToner-form">
                <input type="text" ref={colorRef} id='color' placeholder='¿Qué necesita?' className="Input-solicitud" />
                <textarea type="text" ref={comentarioRef} id='comentario' placeholder='Añade un comentario' className="Input-comentario" />
                <input type="submit" value='Enviar' className="Input-enviar"/>
            </form>
        </div>
        </div>
        </>
    )
}

const EditarToner = () => {

    
    const { editarFormTonerHandler , updateRef } = useContext(TonerContext)

    return(
    <><div className="Editar-container">
    <h2 className="EditarToner-h2">Editar</h2>
        <div className="EditarToner-div">
            <form onSubmit={editarFormTonerHandler} ref={updateRef} className="EditarToner-form">
                <input type="hidden" id='updateId' placeholder='id'/>
                <input type="text" id='updateColor' placeholder='¿Qué necesita?' className="Input-solicitud"/>
                <textarea type="text" id='updateComentario' placeholder='Añade un comentario' className="Input-comentario" />
                <input type="submit" value='Enviar' className="Input-enviar" />
            </form>
        </div>
        </div>
    </>
    )
}

