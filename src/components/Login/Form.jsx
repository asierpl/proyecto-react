//Este archivo representa el componente relacionado con el formulario de inicio de sesión y creación de cuenta

//Importa los hooks utilizados
import { useEffect, useRef, useState } from "react"

//Importa el estilo CSS para este componente
import './Form.css'

//Importa el hook useNavigate para la navegación relacionado con el formulario de inicio de sesión y creación de cuenta.
import { useNavigate } from "react-router-dom"

//Exporta y define el componente
export const Form = () => {

    //Define el array de objetos de los botones que despliegan los formularios.
    const login = [
        { id: 0 , btn : "Iniciar sesion" },
        { id: 1 , btn : "Crear cuenta"   }
    ]

    //Recoge la variable de entorno 'VITE_URL_API' del entorno de importación
    const { VITE_URL_API } = import.meta.env
    
    //Define hook para redirigir a otras paginas
    const navigate = useNavigate()

    //Estado del componente para gestionar la visualizacion del login
    const [ active , setActive ] = useState('')
    const loginHandler = (valor) => setActive(valor)
    
    //Estado del componente para almacenar los datos del formulario
    const [ loginData , setLoginData ] = useState({login : {} , iniciar : {} , crear : {}})
    
    //Referencias a los campos de usuario y contraseña del formulario.
    const user = useRef('')
    const pass = useRef('')

    //Gestiona el envío del formulario al servidor.
    const formHandler = (e) => {
        e.preventDefault()

        //Define el objeto de los datos del usuario
        let nuevo = {
            user : user.current.value,
            pass : pass.current.value
        }

        let controller = new AbortController()

        //Configura la solicitud de inicio de sesión.
        let options = {
            method  : 'post' , 
            signal : controller.signal,
            body    : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }
        }

        //Realiza la solicitud al servidor.
        fetch(VITE_URL_API , options)
        .then( res => res.json() )
        .then( data => {
            
            //Almacena los datos del usuario en localStorage y navega a la page inicio.
            if( data ){
                localStorage.setItem('usuarios' , JSON.stringify(data))
                navigate('/inicio')
            }
        })
        .catch( error => console.log( error ))
        .finally(()=> controller.abort())
    }

   //Obtiene los datos iniciales del servidor al cargar el componente
    useEffect (()=> {
        
        let controller = new AbortController()
       
        let options = {
            method : 'get', 
            signal : controller.signal,
        }
        
        fetch(`${VITE_URL_API}` , options)
        .then( res => res.json() )
        .then( data => {console.log("Data:" , data), setLoginData (data)})  
        .catch( error => console.log( error )) 
    } , [] )
    
    //Deconstrucción de propiedades presentes en la interfaz del login.
    const { srcCanon  , altCanon } = loginData.login
    const { htmlUserI  , labelUserI  , typeUserI  , nameUserI  , placeholderUserI  , htmlPassI  , labelPassI , typePassI , namePassI , placeholderPassI  , typeI  , valueI } = loginData.iniciar
    const { htmlUserC  , labelUserC  , typeUserC  , nameUserC  , placeholderUserC  , htmlEmailC , labelEmailC , typeEmailC , nameEmailC , placeholderEmailC  , htmlPassC  , labelPassC  , typePassC  , namePassC  , placeholderPassC  , typeC  , valueC  } = loginData.crear
    
    //Retorna el contenido del componente
    return (
        <> 
        
        <div className="Container-login">

            {/* Imagen del logo de la empresa */}
            <img src="/assets/logobonanza.jpg" alt="Bonanza" className='Bonanza-portada' />

            {/* Botones de inicio de sesión y creación de cuenta */}
            <div className="Open-login">

                { login.map( eachBtn  => 
                    <OpenLogin key={ eachBtn.id } { ...eachBtn } loginHandler = { loginHandler }/>
                )} 

            </div>

            {/* Muestra el formulario de inicio de sesión cuando la pestaña está activa */}
            {(active === login[0].btn ) && (
                <div  className={`Login ${ active ? 'isActive' : '' } `}>

                    {/* Botón con icono para cerrar el formulario */}
                    <button className="Close-btn" onClick={()=>loginHandler('')}>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                    </button>
                    
                    {/* Imagen superior del formulario de inicio */}
                    <img className="Imagen-canon" src={srcCanon} alt={altCanon} />

                        {/* Formulario de inicio de sesión */}
                        <form onSubmit={ formHandler }>
                        
                            {/* Campo de usuario */}
                            <div className="Caja-login">
                                <label htmlFor={htmlUserI}>{labelUserI}</label>
                            </div>
                                <input type={typeUserI}  className='Placeholder'  name={nameUserI} ref={user} placeholder={placeholderUserI}/>
                            
                            {/* Campo de contraseña */}
                            <div className="Caja-login">
                                <label htmlFor={htmlPassI}>{labelPassI}</label>
                            </div>
                                <input type={typePassI} className='Placeholder' name={namePassI} ref={pass} placeholder={placeholderPassI}/>
                            
                            {/* Botón de continuar */}
                            <div className="Caja-continuar">
                                <input type={typeI}   value={valueI} />
                            </div>
                            {/* Temporal para usuarios que visiten mi GitHub */}
                            <div className="Extra-div">
                                <p className="Extra-p"> Usuario : asier</p>
                                <p className="Extra-p"> Contraseña : asier</p>
                            </div>
    
                        </form>
                    
                </div>
            )}

            {/* Muestra el formulario de crear cuenta cuando la pestaña está activa */}
            {(active === login[1].btn ) && (
                <div className={`Crear ${ active ? 'isActive' : '' } `}>
                    
                    {/* Botón con icono para cerrar el formulario */}
                    <button 
                        className="Close-btn"
                        onClick={()=>loginHandler('')}>
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                            </svg>
                    </button>

                    {/* Formulario de inicio de sesión */}
                    <img className="Imagen-canon" src={srcCanon} alt={altCanon} />

                    {/* Formulario de crear cuenta nueva */}
                    <form>

                        {/* Campo de usuario */}
                        <div className="Caja-iniciar">
                            <label htmlFor={htmlUserC}>{labelUserC}</label>
                        </div>
                            <input type={typeUserC} className='Placeholder' name={nameUserC}  placeholder={placeholderUserC}/>
                        
                        {/* Campo de email */}
                        <div className="Caja-iniciar">
                            <label htmlFor={htmlEmailC}>{labelEmailC}</label>
                        </div>
                            <input type={typeEmailC}  className='Placeholder' name={nameEmailC} placeholder={placeholderEmailC}/>
                        
                        {/* Campo de contraseña */}
                        <div className="Caja-iniciar">
                            <label htmlFor={htmlPassC}>{labelPassC}</label>
                        </div>
                            <input type={typePassC} className='Placeholder' name={namePassC}  placeholder={placeholderPassC}/>
                        
                        {/* Botón de continuar */}
                        <div className="Caja-continuar">
                            <input type={typeC}   value={valueC} />
                        </div>

                        {/* Temporal para usuarios que visiten mi GitHub */}
                        <div className="Extra-div">
                                <p className="Extra-p"> Deshabilitado</p>
                        </div>
                    </form>

                </div>
             )}

        </div>

        {/* Encabezado de la portada del componente 'Form' */}
        <h1 className="Bienvenida">Equipos de Oficina y Sistemas de Impresión</h1>

        {/* Contenedor de la imagen de fondo del componente que la ejecutamos en 'Form.css' */}
        <div className="Portada-container">
            {/* <img className='Img-portada' src="/assets/impresoras44.JPG" alt='Imagen' /> */}
        </div>
        
        </>
    )
}

//Define el componente para los botones de inicio y crear cuenta.
const OpenLogin = (props) => {
    const {loginHandler , btn} = props

    return(
        <>
        <button className="Open-btn" onClick={()=> loginHandler(btn)} >
            {btn}
        </button>
        </>
    )
}


