import axios from 'axios';
import React, { useState } from 'react'
import './register.css';
const Register = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    
    const onsubmit = (e)=>{
        e.preventDefault()
        const register = async()=>{
            try {
                const res = await axios.post('/auth/register',{
                    username:username,
                    email:email,
                    password:password
                })
            } catch (error) {
                console.log(error)
            }
        }
        register()
        window.location.href='http://localhost:3000/login';
    }
    return (
        <div className='register'>
            <div className='container'>
                <div className='wrapper'>
                    <div className='row'>
                        <div className='col-12 col-md-5'> 
                            <div className='logo-register'>
                                <h1>PREDATOR</h1>
                                <h5>Oyuncuların Bir Numaralı Tercihi</h5>
                            </div>
                        </div>
                        <div className='col-12 col-md-7'>
                            <div className='formwrapper'>
                                <form onSubmit={onsubmit}>
                                    <input type="text" 
                                        name="username" 
                                        id="" 
                                        className='form-control mt-2' 
                                        placeholder='Kullanıcı Adı' 
                                        onChange={(e)=>setUsername(e.target.value)}/>
                                    <input 
                                        type="text" 
                                        name='email' 
                                        className='form-control mt-2' 
                                        placeholder='Email' 
                                        onChange={(e)=>setEmail(e.target.value)}/>
                                    <input 
                                        type="password" 
                                        name='password' 
                                        className='form-control mt-2' 
                                        placeholder='Parola'
                                        onChange={(e)=>setPassword(e.target.value)}/>
                                    <button className='btn btn-secondary mt-3'>Üye Ol</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Register