
import { useEffect, useRef, useState } from "react"
import './Form.css'
import { useNavigate } from "react-router-dom"

export const Form = () => {

const login = [
    {id: 0 , btn : "Iniciar sesion"},
    {id: 1 , btn : "Crear cuenta"}
]

    const { VITE_URL_API } = import.meta.env
    
    const navigate = useNavigate()

    const [ active , setActive ] = useState('')
    const loginHandler = (valor) => setActive(valor)

    const [ loginData , setLoginData ] = useState({login : {} , iniciar : {} , crear : {}})
    
    const user = useRef('')
    const pass = useRef('')

    

    const formHandler = (e) => {
        e.preventDefault()


        let nuevo = {
            user : user.current.value,
            pass : pass.current.value,
        }

        let options = {
            method  : 'post' , 
            body    : JSON.stringify(nuevo),
            headers : {
                "Content-type" : "application/json"
            }
        }

        fetch(VITE_URL_API , options)
        .then( res => res.json() )
        .then( data => {
            
            if( data ){
                localStorage.setItem('usuarios' , JSON.stringify(data))
                navigate('/gestor')
            }
        })
        .catch( error => console.log( error ))
    }

    useEffect (()=> {
        fetch(`${VITE_URL_API}`)
        .then( res => res.json() )
        .then( data => {console.log("Data:" , data), setLoginData (data)})  
        .catch( error => console.log( error )) 
    } , [] )
    
    const { srcCanon  , altCanon  , srcPort  , altPort } = loginData.login[0] || {}
    const {htmlUserI  , labelUserI  , typeUserI  , nameUserI  , placeholderUserI  , htmlPassI  , labelPassI , typePassI , namePassI , placeholderPassI  , typeI  , valueI } = loginData.iniciar[0] || {}
    const {htmlUserC  , labelUserC  , typeUserC  , nameUserC  , placeholderUserC  , htmlEmailC , labelEmailC , typeEmailC , nameEmailC , placeholderEmailC  , htmlPassC  , labelPassC  , typePassC  , namePassC  , placeholderPassC  , typeC  , valueC  } = loginData.crear[0] || {}
    return (
        <> 
        <div className="Container-login">

            <img src={srcCanon} alt={altCanon} className="Canon-portada" />

            <img className='Img-portada' src={srcPort} alt={altPort} />

            <div className="Open-login">

               { login.map( eachBtn  => 
               <OpenLogin 
               key={eachBtn.id}
               {...eachBtn}
               loginHandler = {loginHandler}
               
               />
            )} 
            </div>


            

                {(active === login[0].btn ) && (
            <div  className={`Login ${ active ? 'isActive' : '' } `}>
            <button 
                className="Close-btn"
                onClick={()=>loginHandler('')}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
            </button>
            <img className="Imagen-canon" src={srcCanon} alt={altCanon} />

                <form onSubmit={ formHandler }>
                    
                    <div className="Caja-login">
                        <label htmlFor={htmlUserI}>{labelUserI}</label>
                    </div>
                        <input type={typeUserI}  className='Placeholder'  name={nameUserI} ref={user} placeholder={placeholderUserI}/>
                    <div className="Caja-login">
                        <label htmlFor={htmlPassI}>{labelPassI}</label>
                    </div>
                        <input type={typePassI} className='Placeholder' name={namePassI} ref={pass} placeholder={placeholderPassI}/>
                    <div className="Caja-continuar">
                        <input type={typeI}   value={valueI} />
                    </div>
                    
                </form>
                
            </div>
            )}

            {(active === login[1].btn ) && (
            <div className={`Crear ${ active ? 'isActive' : '' } `}>
            <button 
                className="Close-btn"
                onClick={()=>loginHandler('')}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                    </svg>
            </button>
            <img className="Imagen-canon" src={srcCanon} alt={altCanon} />


            <form>
                
                <div className="Caja-iniciar">
                    <label htmlFor={htmlUserC}>{labelUserC}</label>
                </div>
                    <input type={typeUserC}  className='Placeholder'   name={nameUserC}  placeholder={placeholderUserC}/>
                <div className="Caja-iniciar">
                    <label htmlFor={htmlEmailC}>{labelEmailC}</label>
                </div>
                    <input type={typeEmailC}  className='Placeholder'  name={nameEmailC} placeholder={placeholderEmailC}/>
                <div className="Caja-iniciar">
                    <label htmlFor={htmlPassC}>{labelPassC}</label>
                </div>
                    <input type={typePassC} className='Placeholder' name={namePassC}  placeholder={placeholderPassC}/>
                <div className="Caja-continuar">
                    <input type={typeC}   value={valueC} />
                </div>
            </form>
                </div>
                )}

        </div>
        </>
    )
}


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


