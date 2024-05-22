import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputComponent from '../components/input/InputComponent';
import LoginImg from "../img/LoginImg.png"

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            
            const data = await response.json();

            if (data.success) {
                alert('Login berhasil');
            } else {
                alert('Login gagal');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat login');
        }
    };

    return (
    <div className="grid grid-cols-2 bg-[#322C2B] py-12 px-20 h-dvh">
        <div className="h-full rounded-l-sm bg-[#E4C59E]">
        <div className="bg-beige-500 flex items-center justify-center mt-10">
            <img src={LoginImg} alt="Fashion Image" className="w-[500px] h-[550px] rounded-lg" />
        </div>
        </div>
        <div className=" bg-white shadow-md rounded-r-sm grid ">
        <div className="ms-20 mt-12 w-3/4 p-8">
                <h2 className="text-3xl font-bold mb-12 text-[#AF8260] text-center">JO'E CAPE</h2>
                <form onSubmit={handleSubmit} className="space-y-5 ">
                    <InputComponent id={"email"} name={"email"} label={"Email Address"} type={"email"} value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <InputComponent id={"password"} name={"password"} label={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="form-checkbox h-4 w-4 text-gray-600" />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">Remember Me</label>
                    </div>
                    <div className="text-sm">
                        <a href="#" className="font-medium text-gray-600 hover:text-gray-500">Forgot Password?</a>
                    </div>
                    </div>
                        <div>
                            <button type="submit" className="w-full bg-[#322C2B] text-white p-2 rounded-md hover:bg-[#AF8260] focus:outline-none focus:bg-[#AF8260]">Login</button>
                        </div>
                    <div className="text-center">
                        <p className="text-md text-gray-600">Don’t have an account?
                        <Link to="/register" className="text-[#E4C59E] hover:text-orange-500 font-medium"> Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>    
    </div>

    );
}

export default Login;
