import { useEffect, useRef, useState } from 'react'
import './Toner.css'

//Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
const { VITE_URL_API } = import.meta.env

export const Toner = () => {

   
    const colorRef      = useRef()
    const comentarioRef = useRef()

    const updateRef = useRef()

    // const formUpdateRef = useRef()

    const [ datos , setDatos ] = useState({ toner : []})

    

    useEffect( () => {
        fetch( `${VITE_URL_API}/mantenimiento` )
        .then( res => res.json() )
        .then( data => {console.log(data) , setDatos(data)})
        .catch( error => console.log(error))
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

        <>
        <h2>Mantenimiento</h2>
        <h2 className="SolicitudToner-h2">Tus solicitudes pendientes de tóner</h2>
        <div className="SolicitudToner-container">
            <ul className="SolicitudToner-ul">
                {datos.toner === 0
                
                    ? <li>Nada</li>

                    : (datos.toner && datos.toner.map( eachToner => 
                        <ListaToner key={eachToner.id}{...eachToner}
                        deleteTonerHandler={deleteTonerHandler}
                        updateTonerHandler={updateTonerHandler}
                        />
                    ))
                }
            </ul>
        </div>
        
        <AddToner 
        addTonerHandler = {addTonerHandler} 
         
        colorRef        = {colorRef}
        comentarioRef   = {comentarioRef}
         />

        <EditarToner 
        editarFormTonerHandler={editarFormTonerHandler}
        updateRef={updateRef} />


        {/* <ActualizarToner/> */}

        </>
    )
}



const ListaToner = (props) => {
    const {color , comentario , deleteTonerHandler , _id , updateTonerHandler} = props
    
    

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
                <button onClick={()=> updateTonerHandler(_id)} className="Toner-update">Actualizar</button>
                <button onClick={()=> deleteTonerHandler(_id)} className="Toner-delete">Eliminar</button>
            </div>
        </li>
        </>
    )
}

 const AddToner = (props) => {

    const { addTonerHandler , colorRef , comentarioRef} = props

    return(
        <>
        <h2 className="AddToner-h2">Editar</h2>
        <div className="AddToner-div">
            <form onSubmit={addTonerHandler}  className="AddToner-form">
                <input type="text" ref={colorRef} id='color' placeholder='¿Qué necesita?' />
                <input type="text" ref={comentarioRef} id='comentario' placeholder='Añade un comentario' />
                <input type="submit" value='Añadir' />
            </form>
        </div>
        </>
    )
}


const EditarToner = (props) => {

    const { editarFormTonerHandler , updateRef} = props
    return(
    <>
    <h2 className="EditarToner-h2">Añadir</h2>
        <div className="EditarToner-div">
            <form onSubmit={editarFormTonerHandler} ref={updateRef} className="EditarToner-form">
                <input type="text" id='updateId' placeholder='id'/>
                <input type="text" id='updateColor' placeholder='¿Qué necesita?' />
                <input type="text" id='updateComentario' placeholder='Añade un comentario' />
                <input type="submit" value='Editar' />
            </form>
        </div>
    </>
    )
}

