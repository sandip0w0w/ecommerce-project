import React, { useEffect, useState } from 'react'
import Title from '../component/Title'
import { EyeClosed, Eye } from 'lucide-react';
import api from '../api/axios.js'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const { login, loading, user, setToken } = useAuth();
    const [isVisible, setIsVisible] = useState(false);
    const togglePassword = () => setIsVisible((prev) => !prev);
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(user && !loading){
            navigate('/');
        }
    },[user, navigate, loading])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formElement = e.target;
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);
        console.log(data.email);
        try{
            if(!isLogin){
                const response = await api.post('/user/register', data);
                if(response.data.success){
                    toast.success("User Created");
                    if(response.data.token){
                        localStorage.setItem("token", response.data.token);
                        setToken(response.data.token);
                    }
                    formElement.reset();
                    navigate("/");
                }else{
                    toast.error(response.data.message);
                }
            } else{
                const response = await login(data.email, data.password);
                if(response){
                    navigate("/");
                } 
            }
            
        }catch(error){
            console.log(error.message);
        }
    }
    
    return (
        <div className="flex justify-center items-center my-30">
            <div className='flex flex-col w-full sm:w-[30%]'>
                <h2 className='font-[Cormorant_Garamond] text-3xl self-center'><Title text2={isLogin ? "Login" : "Sign Up"} /></h2>
                <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
                    {!isLogin && <input name = "name" type="text" className='w-full border text-sm text-gray-800 py-2 px-5 placeholder:opacity-100' placeholder='Name' required />}

                    <input name = "email" type="email" className='w-full border text-sm text-gray-800 py-2 px-5 placeholder:opacity-100' placeholder='Email' required/>
                    <div className='relative'>
                        <input name = "password" type={isVisible ? "text" : "password"} className='w-full border text-sm text-gray-800 py-2 px-5' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" className='absolute top-2 right-2' onClick={togglePassword}>
                            {isVisible ? <EyeClosed className='w-4' /> : <Eye className='w-4' />}
                        </button>
                    </div>
                    <div className='flex justify-between text-xs'>
                        <p>Forgot your password?</p>
                        <p className='cursor-pointer' onClick={() => setIsLogin((prev) => !prev)}>{isLogin ?"Create account" : "Login Here"}</p>
                    </div>
                    <button className="bg-black text-white p-2 self-center w-[120px]" type = "submit">{isLogin ? "Sign In" : "Sign Up"}</button>

                </form>
            </div>

        </div>
    )
}

export default LoginPage