//Este archivo contiene el componente Toner, que representa el gestor de mantenimiento de toner de la empresa para los clientes.

//Importa los hooks necesarios
import { createContext, useContext, useEffect, useRef, useState } from 'react'

//Importa el estilo CSS para esta página.
import './Toner.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

//Crea un contexto para compartir información sin usar props
const TonerContext  = createContext()

//Componente principal Toner
export const Toner = () => {

    //Referencias para los inputs del formulario
    const colorRef      = useRef()
    const comentarioRef = useRef()
    const updateRef = useRef()

    //Estado para almacenar los datos de los tóner
    const [ datos , setDatos ] = useState({ toner : [] })

    //Hook useEffect para obtener los datos de mantenimiento al cargar el componente
    useEffect( () => {

        //Controlador para cancelar la solicitud del fetch si el componente se desmonta antes de que se complete.
        let controller = new AbortController()
       
        //Opciones para la solicitud del fetch
        let options = {
            method  : 'get' , 
            signal : controller.signal,
        }

        //Obtención de los datos de mantenimiento de la API
        fetch( `${VITE_URL_API}/mantenimiento` , options )
        .then( res => res.json() )
        .then( data => {console.log(data) , setDatos(data)})
        .catch( error => console.log(error))
        .finally( () => controller.abort())
    } , [])

    //Función para agregar un nuevo tóner.
    const addTonerHandler = async (e) => {
        e.preventDefault()

        //Creación de un nuevo tóner con los valores de los inputs del formulario
        let nuevoToner = { 
            color : colorRef.current.value,
            comentario   : comentarioRef.current.value
        }

        //Opciones para la solicitud fetch de tipo POST
        let options = {
            method : 'post',
            headers : { "Content-type" : "application/json"},
            body : JSON.stringify(nuevoToner)
        }

        //Envío de la solicitud fetch para agregar un nuevo tóner a la API
        try {
            const response = await fetch(`${VITE_URL_API}/mantenimiento` , options)
            const data = await response.json()

            //Actualización del estado para reflejar el nuevo tóner
            setDatos({ toner : data.toner })
            setNuevoId( data.nuevoId )

        } catch (error) {
            console.log(error)
        }
        colorRef.current.reset()
        comentarioRef.current.reset()
    }

    //Función para eliminar un tóner existente.
    const deleteTonerHandler = async (id) => {

        //Opciones para la solicitud del fetch tipo DELETE
        let options = {
            method : 'delete',
            headers : { "Content-type" : "application/json"}
        }

        //Envío de la solicitud fetch para eliminar tóner con el ID proporcionado
        try {
            await fetch(`${VITE_URL_API}/mantenimiento/${id}` , options)

            //Obtención de los datos actualizados de mantenimiento después de la eliminación
            const res = await fetch(`${VITE_URL_API}/mantenimiento`)
            const tonerData = await res.json()

            //Actualización del estado para reflejar los datos de mantenimiento actualizados
            setDatos(tonerData && tonerData.toner 
                ? {toner : tonerData.toner}
                : { toner : []} )

        } catch (error) {
            console.log(error)
        }
    }

    //Estado para controlar si se está editando un nuevo tóner
    const [ editar , setEditar ] = useState(false)
    const toggleEditar = () => { setEditar(!editar) }

    //Función para actualizar un nuevo tóner.
    const updateTonerHandler = (id) => {

        //Busca el tóner correspondiente al ID proporcionado.
        const buscar = datos.toner.find( toner => toner._id === id )

        //Asigna los valores del tóner a los campos de edición del formulario.
        const {updateId , updateColor , updateComentario} = updateRef.current

        updateId.value = buscar._id
        updateColor.value = buscar.color
        updateComentario.value = buscar.comentario
        
        //Muestra el formulario para editar
        toggleEditar()
    }

    //Función para editar un tóner.
    const editarFormTonerHandler =  async (e) => {
        e.preventDefault()

        //Obtiene los valores actualizados del formulario de edición
        const {updateId , updateColor , updateComentario} = updateRef.current
        
        const tonerEditado = {
            
            color : updateColor.value,
            comentario : updateComentario.value
        }

        //Opciones para la solicitu fetch de tipo PUT.
        let options = {
            method : 'put',
            headers : { "Content-type" : "application/json"},
            body : JSON.stringify(tonerEditado)
        }

        //Envío de la solicitud fetch para editar el tóner con el ID proporcionado
        try {
            const res = await fetch(`${VITE_URL_API}/mantenimiento/${updateId.value}` , options)
            const nuevoToner = await res.json()
           
            //Actualización del estado para reflejar el tóner editado
            setDatos({toner : nuevoToner})

        } catch (error) {
            console.log(error)
        }

        //Reinicia el formulario de edición
        updateRef.current.reset()
        toggleEditar()
    }

    //Retorna el contenido del componente.
    return(

        // Proveedor de contexto para las referencias necesarias para los componentes
        <TonerContext.Provider value={{ deleteTonerHandler , updateTonerHandler , addTonerHandler , colorRef , comentarioRef , updateRef , editarFormTonerHandler}}>
        <>
        {/* Contenido del componente tóner */}
        <div className="Toner-info">
            <h2 className="Toner-h2">Servicio de mantenimiento</h2>
            <p className="Toner-p">Aquí podrás encontrar tus solicitudes pendientes de recambios de tóner, así como hacer nuevos pedidos y también editar o eliminar los ya existentes.</p>
        </div>
        <div className="Mantenimiento">
            {/* Contenedor para los formularios de añadir y editar */}
            <div className="Formularios-div">
                <AddToner/>
                <EditarToner/>
            </div>

            {/* Encabezados de las listas de solicitudes */}
            {datos.toner.length > 0 && (
            <div className="Solicitud-comentario">
                <h2 className="Solicitud-h2">Solicitud</h2>
                <h2 className="Comentarios-h2">Comentarios</h2>
                <h2 className="Boton-h2"></h2>
            </div>
            )}

            {/* Contenedor para la lista de solicitudes */}
            <div className="SolicitudToner-container">
                <ul className="SolicitudToner-ul">

                    {/* Mapeo de los datos de los tóners para mostrarlos en lista */}
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


//Componente para mostrar los elementos de la lista de solicitudes de tóner.
const ListaToner = (props) => {
    const {color , comentario ,  _id  } = props
    const {deleteTonerHandler , updateTonerHandler} = useContext(TonerContext)
    
    //Retorna el contenido del componente.
    return(
        <>
        <li className="SolicitudToner-li">
            <div className="ColorToner-div">
                <h3 className="ColorToner-h3">{color}</h3>
            </div>
            <div className="ComentarioToner-div">
                <h3 className="ComentarioToner-h3">{comentario}</h3>
            </div>
            {/* Botones de editar y eliminar respectivamente */}
            <div className="Botones-toner">
                <button onClick={()=> updateTonerHandler(_id)} className="Toner-update">Editar</button>
                <button onClick={()=> deleteTonerHandler(_id)} className="Toner-delete">Eliminar</button>
            </div>
        </li>
        </>
    )
}

//Componente para agregar un nuevo tóner
const AddToner = () => {

    const { addTonerHandler , colorRef , comentarioRef } = useContext(TonerContext)

    //Retorna el contenido del componente.
    return(
        <>
        <div className="Add-container">
            {/* Formulario para agregar un nuevo tóner */}
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

//Componente para editar un nuevo tóner
const EditarToner = () => {

    
    const { editarFormTonerHandler , updateRef } = useContext(TonerContext)

    return(
    <>
    <div className="Editar-container">
        {/* Formulario para editar un tóner existente */}
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

