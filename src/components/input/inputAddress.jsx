import React from "react";

export default function InputComponent({ id, name, type, placeholder, value, onChange }) {
  return (
    <div className="text-start w-full">
      <select id={id} name={name} placeholder={placeholder} onChange={onChange} className="w-full p-1 mt-1 border rounded-md focus:border-blue-500 focus:outline-none" required>
        <option value={value}></option>
      </select>
    </div>
  );
}
