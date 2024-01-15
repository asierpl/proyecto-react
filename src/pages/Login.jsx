

import { useNavigate } from 'react-router-dom'
import { useEffect} from "react"
import { Acceso} from '../components/Login/Login'

export const Login = () => {


    
    const navigate = useNavigate()
    

    useEffect(()=>{

        if( localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

    

    
    
    return (
        <> 
       <Acceso/>
        </>
    )
}









// import { useNavigate } from 'react-router-dom'
// import { useEffect, useRef, useState } from "react"
// import './Login.css'

// export const Login = () => {

// const login = [
//     {id: 0 , btn : "Iniciar sesion"},
//     {id: 1 , btn : "Crear cuenta"}
// ]

//     const { VITE_URL_API } = import.meta.env

   
//     const [ active , setActive ] = useState('')
//     const loginHandler = (valor) => setActive(valor)
   
    
//     const navigate = useNavigate()
//     const user = useRef('')
//     const pass = useRef('')

//     useEffect(()=>{

//         if( localStorage.getItem('usuarios')){
//             navigate('/')
//         }
//     } , [])

//     const formHandler = (e) => {
//         e.preventDefault()


//         let nuevo = {
//             user : user.current.value,
//             pass : pass.current.value,
//         }

//         let options = {
//             method  : 'post' , 
//             body    : JSON.stringify(nuevo),
//             headers : {
//                 "Content-type" : "application/json"
//             }
//         }

//         fetch(VITE_URL_API , options)
//         .then( res => res.json() )
//         .then( data => {
            
//             if( data ){
//                 localStorage.setItem('usuarios' , JSON.stringify(data))
//                 navigate('/gestor')
//             }
//         })
//         .catch( error => console.log( error ))
//     }

    
    
//     return (
//         <> 
//         <div className="Container-login">

//             <img src="/assets/canon.png" alt="imagen" className="Canon-portada" />

//             <img className='Img-portada' src="/assets/equipo.png" alt="imagen" />

//             <div className="Open-login">

//                { login.map( eachBtn => 
//                <OpenLogin 
//                key={eachBtn.id}
//                {...eachBtn}
//                loginHandler = {loginHandler}/>
//             )}
               
                
//             </div>
//                 {(active === login[0].btn ) && (
//             <div  className={`Login ${ active ? 'isActive' : '' } `}>
//             <button 
//                 className="Close-btn"
//                 onClick={()=>loginHandler('')}>
//                     <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
//                     </svg>
//             </button>
//             <img className="Imagen-canon" src="/assets/canon.png" alt="imagen" />

//                 <form onSubmit={ formHandler }>
                    
//                     <div className="Caja-login">
//                         <label htmlFor="user">Nombre de usuario</label>
//                     </div>
//                         <input type="text"  className='Placeholder'  name="user" ref={user} placeholder="Ingresa tu nombre de usuario"/>
//                     <div className="Caja-login">
//                         <label htmlFor="pass">Contraseña</label>
//                     </div>
//                         <input type="password" className='Placeholder' name="pass" ref={pass} placeholder="Ingresa tu contraseña"/>
//                     <div className="Caja-continuar">
//                         <input type="submit"   value="Acceder" />
//                     </div>
                    
//                 </form>
                
//             </div>
//             )}

//             {(active === login[1].btn ) && (
//             <div className={`Crear ${ active ? 'isActive' : '' } `}>
//             <button 
//                 className="Close-btn"
//                 onClick={()=>loginHandler('')}>
//                     <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
//                     </svg>
//             </button>
//             <img className="Imagen-canon" src="/assets/canon.png" alt="imagen" />
//             <form>
                
//                 <div className="Caja-iniciar">
//                     <label htmlFor="user">Nombre de usuario</label>
//                 </div>
//                     <input type="text"  className='Placeholder'   name="user"  placeholder="Ingresa un nombre de usuario"/>
//                 <div className="Caja-iniciar">
//                     <label htmlFor="email">Correo electronico</label>
//                 </div>
//                     <input type="email"  className='Placeholder'  name="email" placeholder="Ingresa tu correo electronico o email"/>
//                 <div className="Caja-iniciar">
//                     <label htmlFor="pass">Contraseña</label>
//                 </div>
//                     <input type="password" className='Placeholder' name="pass"  placeholder="Ingresa una contraseña"/>
//                 <div className="Caja-continuar">
//                     <input type="submit"   value="Continuar" />
//                 </div>
//             </form>
//                 </div>
//                 )}

//         </div>
//         </>
//     )
// }


// const OpenLogin = (props) => {
//     const {loginHandler , btn} = props

//     return(
//         <>
//         <button className="Open-btn" onClick={()=> loginHandler(btn)} >
//             {btn}
//         </button>
//         </>
//     )
// }

