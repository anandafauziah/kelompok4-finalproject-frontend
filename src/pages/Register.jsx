import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputComponent from '../components/input/InputComponent';
import RegisterImg from "../img/RegisterImg.png"
import InputAddress from '../components/input/inputAddress';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    firstName:'',
    lastName:'',
    phoneNumber:'',
    address:'',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi email sederhana
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setErrorMessage('Format email tidak valid.');
      return;
    }

    // Tambahkan logika pengiriman data atau validasi di sini
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": formData.username,
                "email": formData.email,
                "password": formData.password,
                "firstName":formData.firstName,
                "lastName":formData.lastName,
                "phoneNumber":formData.phoneNumber,
                "address":formData.address,
            }),
        });
        
        const data = await response.json();

        if (data.status == true) {
            alert('Registrasi berhasil');
        } else {
            alert('Registrasi gagal');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat registrasi');
    }

    // Reset form dan pesan error
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    setErrorMessage('Registrasi berhasil!');
  };

  return (
    <div className="grid md:grid-cols-2 bg-[#322C2B] md:py-12 md:px-20 h-dvh">
        <div className="h-full rounded-l-sm bg-[#AF8260]">
        <div className="bg-beige-500 flex items-center justify-center">
            <img src={RegisterImg} alt="Fashion Image" className="md:mt-10 md:w-[500px] md:h-[550px] rounded-lg" />
        </div>
        </div>
      <div className="bg-white p-8 ">
        <h2 className="text-3xl font-bold text-[#AF8260] text-center border-b-2 border-[#A0A0A0] mb-3">JO'E CAPE</h2>
        <p className=""></p>
        {errorMessage && <p className="text-red-500 mb-4 text-center">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-1">
        <InputComponent id={"username"} name={"username"}label={"Username"} type={"text"} value={formData.username} onChange={(e) =>handleChange(e)}/>
        <div className="flex gap-4 ">
          <InputComponent className="w-full" id="firstName" name="firstName" label="First Name" type="text" value={formData.firstName} onChange={(e) => handleChange(e)} />
          <InputComponent className="w-full" id="lastName" name="lastName" label="Last Name" type="text" value={formData.lastName} onChange={(e) => handleChange(e)} />
        </div>
        <InputComponent id={"email"} name={"email"}label={"Email"} type={"text"} value={formData.email} onChange={(e) =>handleChange(e)}/>
        <InputComponent id={"address"} name={"address"}label={"Address"} type={"text"} value={formData.address} onChange={(e) =>handleChange(e)}/>
        <div className='flex gap-2'>
          <InputAddress type={"text"} placeholder= {"City"}value={formData.address} onChange={(e) =>handleChange(e)}/>
          <InputAddress type={"text"} placeholder= {"Province"}value={formData.address} onChange={(e) =>handleChange(e)}/>
          <InputAddress type={"text"} placeholder= {"Zip"}value={formData.address} onChange={(e) =>handleChange(e)}/>
        </div>
        <InputComponent id={"phoneNumber"} name={"phoneNumber"}label={"Phone Number"} type={"tel"} value={formData.phoneNumber} onChange={(e) =>handleChange(e)}/>
        <InputComponent id={"password"} name={"password"}label={"Password"} type={"password"} value={formData.password} onChange={(e) =>handleChange(e)}/>
          <div>
            <button 
              type="submit"
              onSubmit={handleSubmit}
              className="w-full bg-[#322C2B] text-white p-2 rounded-md hover:bg-[#AF8260] focus:outline-none focus:bg-[#AF8260] mt-8">Sign Up
            </button>
          </div>
          <div className="text-center">
              <p className="text-lg text-gray-600">Already have an account?
              <Link to="/" className="text-[#E4C59E] hover:text-orange-500 font-medium"> Sign in</Link></p>
          </div>
        </form>
    </div>
    </div>
  );
}

export default RegistrationForm;
