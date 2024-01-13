import { useNavigate } from 'react-router-dom'
import { useEffect, useRef } from "react"

export const Login = () => {

    const { VITE_URL_API } = import.meta.env
    

    const navigate = useNavigate()
    const user = useRef('')
    const pass = useRef('')

    useEffect(()=>{

        if( localStorage.getItem('usuarios')){
            navigate('/')
        }
    } , [])

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
    

    return (
        <>
            <h2>Login</h2>

            <form onSubmit={ formHandler }>
                <input type="text"     name="user" ref={user} placeholder="user"/>
                <input type="password" name="pass" ref={pass}   placeholder="pass"/>
                <input type="submit"   value="Access" />

            </form>
        </>
    )
}