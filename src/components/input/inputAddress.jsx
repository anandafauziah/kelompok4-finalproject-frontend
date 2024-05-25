import React from "react";

export default function InputComponent({ id,name, type, placeholder, value, onChange}) {
  return (
    <div className="text-start w-full">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-1 mt-1 border rounded-md focus:border-blue-500 focus:outline-none"
        required
      />
    </div>
  );
}
