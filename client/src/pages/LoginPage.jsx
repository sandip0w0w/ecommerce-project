import React, { useState } from 'react'
import Title from '../component/Title'
import { EyeClosed, Eye } from 'lucide-react';

function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const togglePassword = () => setIsVisible((prev) => !prev);
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }
    return (
        <div className="flex justify-center items-center my-30">
            <div className='flex flex-col w-full sm:w-[30%]'>
                <h2 className='font-[Cormorant_Garamond] text-3xl self-center'><Title text2={isLogin ? "Login" : "Sign Up"} /></h2>
                <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
                    {!isLogin && <input type="text" className='w-full border text-sm text-gray-800 py-2 px-5 placeholder:opacity-100' placeholder='Name' required />}

                    <input type="email" className='w-full border text-sm text-gray-800 py-2 px-5 placeholder:opacity-100' placeholder='Email' required/>
                    <div className='relative'>
                        <input type={isVisible ? "text" : "password"} className='w-full border text-sm text-gray-800 py-2 px-5' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
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