import React from 'react'

export default function buttonComponent(type,onSubmit) {
  return (
    <div>
    <button 
      type={type}
      onSubmit={handleSubmit}
      className="w-full bg-[#CE9B00] bg-opacity-40 text-white p-2 rounded-md hover:bg-[#CE9B00] focus:outline-none focus:bg-[#CE9B00]">
      Sign Up
    </button>
    </div>
  )
}
