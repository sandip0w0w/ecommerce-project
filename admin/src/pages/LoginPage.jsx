import React, { useState } from 'react'
import { EyeClosed, Eye } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('admin@forever.com');
    const [password, setPassword] = useState('qwerty123');
    const [isVisible, setIsVisible] = useState(false);
    const togglePassword = () => setIsVisible((prev) => !prev);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Login Successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.error || error.message || "Login failed")
        }
    }
    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <div className="flex flex-col bg-white shadow-sm rounded py-4 px-4 gap-3">
                <p className='font-bold text-2xl'>Admin Panel</p>

                <form onSubmit={handleLogin} className='flex flex-col gap-3'>
                    <div>
                        <p className="font-medium text-[13px] text-gray-600 mb-1">Email Address</p>
                        <input type="email" className='border border-gray-400 rounded text-xs p-2 w-60 outline-none' placeholder='admin@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <p className="font-medium text-[13px] text-gray-600 mb-1">Password</p>
                        <div className='relative'>
                            <input type={isVisible ? "text" : "password"} className='border border-gray-400 rounded text-xs p-2 w-60 outline-none' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" className='absolute top-2 right-2' onClick={togglePassword}>
                                {isVisible ? <EyeClosed className='w-4' /> : <Eye className='w-4' />}
                            </button>
                        </div>

                    </div>
                    <button className="bg-black text-white font-medium text-sm p-2 rounded" type="submit">Login</button>


                </form>
            </div>
        </div>
    )
}

export default LoginPage